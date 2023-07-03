import { Module } from '@nestjs/common';
import { MicroserviceController } from './microservice.controller';
import { MicroserviceService } from './microservice.service';

@Module({
  controllers: [MicroserviceController],
  providers: [MicroserviceService]
})
export class MicroserviceModule {}
