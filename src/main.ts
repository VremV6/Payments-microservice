import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP, // Choose the transport mechanism (e.g., TCP, Redis, NATS) matching your microservice configuration
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  );

  await app.listen();
}
bootstrap();
