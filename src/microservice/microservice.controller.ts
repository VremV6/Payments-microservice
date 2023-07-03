import { Body, Controller, Get, HttpStatus, Redirect, Res } from "@nestjs/common";
import {PaymentsDto} from "./payment.interface";
import {MicroserviceService} from "./microservice.service";
import Stripe from "stripe";
import {MessagePattern} from "@nestjs/microservices";

@Controller('microservice')
export class MicroserviceController {
    constructor(private microservice: MicroserviceService) {
    }

    @Get()
    async createMicroservice(@Body() microserviceDto: PaymentsDto) {
        try {
            const paymentIntent = await this.microservice.createPayment(microserviceDto);

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
