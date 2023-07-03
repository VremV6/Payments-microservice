import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentsDto } from './payment.interface';
@Injectable()
export class MicroserviceService {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe("sk_test_51NNLfnGPmYoMeq5bCEgM2XiSIukH5rAQLbEqagUm2bCpV8jh8Jd5H6thIzE799jCXx1VFLGcffHzzEcbN1GnDh0V005INw18RO", {
            apiVersion: '2022-11-15',
        });
    }

    async createPayment(paymentRequestBody: PaymentsDto): Promise<any> {
        const session = await this.stripe.checkout.sessions.create({
            line_items: [{ price: 'price_1NNM1AGPmYoMeq5bycGWPWgL', quantity: 1 }],
            mode: 'subscription',
            customer: "cus_O9fNxrZisANyB9",
            success_url: 'http://localhost:3000/microservice/success',
            cancel_url: 'http://localhost:3000/microservice/failure',
        });
        return session;
    }
    async successPayment(session){
        console.log(session);
        return session;
    }
}
