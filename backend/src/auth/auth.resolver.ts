import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { AuthPayload } from './dto/auth.response';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => String)
  hello(): string {
    return 'Hello World!';
  }

  @Mutation(() => AuthPayload)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthPayload> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthPayload)
  async register(@Args('registerInput') registerInput: RegisterInput): Promise<AuthPayload> {
    return this.authService.register(registerInput);
  }
}