<<<<<<< HEAD
import { Controller, NotImplementedException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

=======
import { Controller, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderPaginationDTO } from './dto/order-pagination.dto';
import { ChangeOrderStatusDTO } from './dto';
>>>>>>> 1f59b87 (Codigo antes de NATS)

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

<<<<<<< HEAD

  @MessagePattern('createOrder')
  create(@Payload() createOrderDto: CreateOrderDto) {
    
=======
  @MessagePattern('createOrder')
  create(@Payload() createOrderDto: CreateOrderDto) {
>>>>>>> 1f59b87 (Codigo antes de NATS)
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern('findAllOrders')
<<<<<<< HEAD
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern('findOneOrder')
  findOne(@Payload() id: number) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('changerOrderStatus')
  changerOrderStatus() {
    
    throw new NotImplementedException();

    // return this.ordersService.changeStatus();
=======
  findAll(@Payload() orderPaginationDTO: OrderPaginationDTO ) {

    return this.ordersService.findAll(orderPaginationDTO);
  }

  @MessagePattern('findOneOrder')
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('changeOrderStatus')
  changeOrderStatus(@Payload() changeOrderStatusDTO: ChangeOrderStatusDTO){
    return this.ordersService.changeStatus(changeOrderStatusDTO);
>>>>>>> 1f59b87 (Codigo antes de NATS)
  }

}
