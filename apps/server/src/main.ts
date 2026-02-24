import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:3000',
      process.env.FRONTEND_URL ?? 'http://localhost:3000',
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  const port = process.env.PORT ?? 3001;
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`🚀 Server running at http://localhost:${port}`);
  logger.log(`📡 API base:       http://localhost:${port}/auth`);
  logger.log(`🌐 Frontend URL:   ${process.env.FRONTEND_URL ?? 'http://localhost:3000'}`);
  logger.log(`🗄️  Database:       ${process.env.DATABASE_URL?.split('@')[1] ?? 'not set'}`);
}
bootstrap();
