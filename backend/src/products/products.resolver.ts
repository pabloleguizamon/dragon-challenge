import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products' })
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product, { name: 'product' })
  async findOne(@Args('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Query(() => [Product], { name: 'searchProducts' })
  async search(@Args('searchTerm') searchTerm: string): Promise<Product[]> {
    return this.productsService.search(searchTerm);
  }

  @Mutation(() => Product)
  @UseGuards(GqlAuthGuard)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productsService.create(createProductInput);
  }

  @Mutation(() => Product)
  @UseGuards(GqlAuthGuard)
  async updateProduct(
    @Args('id') id: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductInput);
  }

  @Mutation(() => Product)
  @UseGuards(GqlAuthGuard)
  async deleteProduct(@Args('id') id: string): Promise<Product> {
    return this.productsService.remove(id);
  }
}