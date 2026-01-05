import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';

@Entity('order_items')
@ObjectType()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column()
  orderId: string;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'productId' })
  @Field(() => Product)
  product: Product;

  @Column()
  productId: string;

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  subtotal: number;
}