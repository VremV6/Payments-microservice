import { Body, Controller, Get, HttpStatus, Redirect, Res } from "@nestjs/common";
import { PlansDTO } from "./plans.interface";
import {MicroserviceService} from "./microservice.service";
import {MessagePattern} from "@nestjs/microservices";

@Controller('microservice')
export class MicroserviceController {
    constructor(private microservice: MicroserviceService) {
    }

    @MessagePattern({ cmd: 'create-payment' })
    async createMicroservice(plan: PlansDTO) {
        try {
            const paymentIntent = await this.microservice.createPayment(plan);

            return { status: HttpStatus.CREATED, data: paymentIntent };
        } catch (error) {
            return { status: HttpStatus.INTERNAL_SERVER_ERROR, error };
        }
    }

    @Get('success')
    @Redirect('/')
    paymentSuccess() {
        // Any additional logic before the redirect
    }
}
