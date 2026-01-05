import { InputType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { OrderStatus } from '../order.entity';

@InputType()
export class UpdateOrderStatusInput {
  @Field(() => OrderStatus)
  @IsEnum(OrderStatus)
  status: OrderStatus;
}