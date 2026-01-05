const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/app.module');
const { ValidationPipe } = require('@nestjs/common');
(async () => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.enableCors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true });
  const port = process.env.API_PORT || 3001;
  await app.listen(port, '0.0.0.0');
  console.log('Server started on', port);
})().catch(e => { console.error(e); process.exit(1); });
