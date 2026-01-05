import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@Entity('products')
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column('text')
  @Field()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  price: number;

  @Column({ default: 0 })
  @Field()
  stock: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imageUrl?: string;

  @Column({ default: true })
  @Field()
  isActive: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}