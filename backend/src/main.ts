import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('Iniciando bootstrap...');
  const app = await NestFactory.create(AppModule);
  console.log('NestFactory.create completado');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );
  console.log('Pipes globales configurados');

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });
  console.log('CORS habilitado');

  const port = process.env.API_PORT || 3001;
  console.log('Puerto configurado:', port);
  // Create a default user in development for convenience
  if (process.env.NODE_ENV !== 'production') {
    try {
      console.log('Intentando crear usuario por defecto...');
      const usersService = app.get(require('./users/users.service').UsersService);
      await usersService.findOrCreateDefault();
      console.log('Usuario por defecto creado o ya existente.');
    }
    catch (e) {
      console.warn('Could not seed default user:', e instanceof Error ? e.message : String(e));
    }
  }

  console.log('Intentando iniciar app.listen...');
  await app.listen(port, '0.0.0.0');
  console.log(`🐉 Dragon API is running on http://localhost:${port}`);
  console.log(`📊 GraphQL Playground: http://localhost:${port}/graphql`);
}

bootstrap();
