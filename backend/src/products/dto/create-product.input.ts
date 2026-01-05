import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @Field({ defaultValue: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}