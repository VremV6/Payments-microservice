import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PlansDTO } from "./plans.interface";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');
const config = fs.readJsonSync('./src/config/config.json');

@Injectable()
export class MicroserviceService {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(config.stripe.key, {
            apiVersion: '2022-11-15',
        });
    }

    async createPayment(plan: PlansDTO): Promise<any> {
        const id = await this.planProductChooser(plan);
        const session = await this.stripe.checkout.sessions.create({
            line_items: [{ price: id, quantity: 1 }],
            mode: 'subscription',
            customer: config.stripe.customer,
            success_url: 'http://localhost:3000/',
            cancel_url: 'http://localhost:3000/microservice/failure',
        });
        return session;
    }

    async planProductChooser(plan: PlansDTO): Promise<string> {
        switch (plan.name) {
            case "Basic":
                return config.stripe.product.Basic;
            case "Pro":
                return config.stripe.product.Pro;
            case "AI":
                return config.stripe.product.AI;
        }
    }
}
