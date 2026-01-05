import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private ordersService: OrdersService) {}

  @Query(() => [Order], { name: 'orders' })
  @UseGuards(GqlAuthGuard)
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Query(() => [Order], { name: 'myOrders' })
  @UseGuards(GqlAuthGuard)
  async findMyOrders(@CurrentUser() user: User): Promise<Order[]> {
    return this.ordersService.findByUser(user.id);
  }

  @Query(() => [Order], { name: 'ordersByUser' })
  @UseGuards(GqlAuthGuard)
  async findByUser(@Args('userId') userId: string): Promise<Order[]> {
    return this.ordersService.findByUser(userId);
  }

  @Query(() => Order, { name: 'order' })
  @UseGuards(GqlAuthGuard)
  async findOne(@Args('id') id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => Order)
  @UseGuards(GqlAuthGuard)
  async createOrder(
    @CurrentUser() user: User,
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<Order> {
    return this.ordersService.create(user.id, createOrderInput);
  }

  @Mutation(() => Order)
  @UseGuards(GqlAuthGuard)
  async updateOrderStatus(
    @Args('id') id: string,
    @Args('updateOrderStatusInput') updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<Order> {
    return this.ordersService.updateStatus(id, updateOrderStatusInput);
  }
}