import { IsNumber, isNumber, IsPositive, isPositive } from "class-validator";

export class OrderItemDTO{
    
    @IsNumber()
    @IsPositive()
    productId: number;

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNumber()
    @IsPositive()
    price: number;
}