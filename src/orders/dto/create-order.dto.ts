import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OrderItemDTO } from "./order-item.dto";

export class CreateOrderDto {

    /*
    / VERSION 2
    */

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type( () => OrderItemDTO)
    items: OrderItemDTO[]
    
    
    
    /*
    / VERSION 1 
    */
    
    // @IsNumber()
    // @IsPositive()
    // totalAmount: number;

    // @IsNumber()
    // @IsPositive()
    // totalItems: number;

    // @IsEnum( OrderStatusList, {
    //     message: `Possible status values ar ${ OrderStatusList }`
    // } )
    // @IsOptional()
    // status: OrderStatus = OrderStatus.PENDING;

    // @IsOptional()
    // @IsBoolean()
    // paid: boolean = false;

    


}
