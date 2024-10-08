import { IsEnum, IsOptional } from "class-validator";

import { OrderStatusList } from "../enum/order.enum";
import { OrderStatus } from "@prisma/client";
import { PaginationDTO } from "src/common";


export class OrderPaginationDTO extends PaginationDTO{
    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: `Valid status are ${ OrderStatusList }`
    })
    status: OrderStatus;
}