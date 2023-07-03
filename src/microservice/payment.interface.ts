import {Product} from "./Product";
export interface PaymentsDto {
    products: Product[];
    currency: string;
}