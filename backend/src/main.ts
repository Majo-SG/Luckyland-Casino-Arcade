import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Valida automáticamente los DTOs (usando los decoradores de class-validator)
  // y quita cualquier campo que no esté definido en el DTO.
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  app.enableCors(); // por si el frontend corre en otro puerto (ej. Vite en :5173)

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Backend corriendo en http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
