import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private productsService: ProductsService,
  ) {}

  async create(userId: string, createOrderInput: CreateOrderInput): Promise<Order> {
    let total = 0;

    // Crear la orden primero
    const order = this.orderRepository.create({
      userId,
      total: 0,
      status: OrderStatus.PENDING,
    });
    
    const savedOrder = await this.orderRepository.save(order);

    // Procesar cada item del pedido
    for (const item of createOrderInput.items) {
      const product = await this.productsService.findOne(item.productId);

      // Verificar stock
      if (product.stock < item.quantity) {
        // Eliminar la orden si hay error
        await this.orderRepository.remove(savedOrder);
        throw new BadRequestException(
          `Not enough stock for product ${product.name}. Available: ${product.stock}`,
        );
      }

      // Crear order item
      const orderItem = this.orderItemRepository.create({
        orderId: savedOrder.id,
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
        subtotal: product.price * item.quantity,
      });

      await this.orderItemRepository.save(orderItem);
      total += orderItem.subtotal;

      // Actualizar stock del producto
      product.stock -= item.quantity;
      await this.productsService.update(product.id, { stock: product.stock });
    }

    // Actualizar el total
    savedOrder.total = total;
    await this.orderRepository.save(savedOrder);

    // Retornar la orden con todas las relaciones cargadas
    return this.findOne(savedOrder.id);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['items', 'items.product', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { userId },
      relations: ['items', 'items.product', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ 
      where: { id },
      relations: ['items', 'items.product', 'user'],
    });
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    
    return order;
  }

  async updateStatus(id: string, updateOrderStatusInput: UpdateOrderStatusInput): Promise<Order> {
    const order = await this.findOne(id);
    order.status = updateOrderStatusInput.status;
    return await this.orderRepository.save(order);
  }
}