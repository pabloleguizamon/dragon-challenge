import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsArray, ArrayMinSize, IsNumber, IsUUID, Min } from 'class-validator';

@InputType()
class OrderItemInput {
  @Field()
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}

@InputType()
export class CreateOrderInput {
  @Field(() => [OrderItemInput])
  @IsArray()
  @ArrayMinSize(1)
  items: OrderItemInput[];
}