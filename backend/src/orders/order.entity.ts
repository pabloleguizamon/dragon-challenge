import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';
import { User } from '../users/user.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});

@Entity('orders')
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  @Field(() => User)
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { eager: true, cascade: true })
  @Field(() => [OrderItem])
  items: OrderItem[];

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  total: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  @Field(() => OrderStatus)
  status: OrderStatus;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}