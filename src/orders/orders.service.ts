<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';


@Injectable()
export class OrdersService {
  
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

=======
import { HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus, PrismaClient } from '@prisma/client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { OrderPaginationDTO } from './dto/order-pagination.dto';
import { date } from 'joi';
import { ChangeOrderStatusDTO } from './dto';
import { PRODUCT_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit{

  private readonly logger = new Logger('OrderService');
  
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ){
    super();
  }

  async onModuleInit() {
        await this.$connect(); //Inicializacion a la db
        this.logger.log(`Postgres Database Connected`);
  }

  async create(createOrderDto: CreateOrderDto) {
    
    try {

      // 1) Confirmar los ids de los productos
      const productIds = createOrderDto.items.map( (item) => item.productId );
      const products: any[] =  await firstValueFrom ((this.productsClient.send({ cmd: 'validate_products'}, productIds)));

      // 2) Calculos de los valores
      const totalAmount = createOrderDto.items.reduce(( acc, orderItem ) => {
        
        const price = products.find(
          (product) => product.id === orderItem.productId,
        ).price;

        return price * orderItem.quantity;

      }, 0);

      const totalItems = createOrderDto.items.reduce( (acc, orderItem) => {
        return acc + orderItem.quantity;
      }, 0)
      
      // 3) Crear transaccion de DB
      const order = await this.order.create({
        data: {
          totalAmount: totalAmount,
          totalItems: totalItems,
          OrderItem: {
            createMany: {
              data: createOrderDto.items.map( (orderItem) => ({
                price: products.find( product => product.id === orderItem.productId ).price,
                productId: orderItem.productId,
                quantity: orderItem.quantity,
              })),
            },
          },
        },

        include: {
          OrderItem: {
            select: {
              price: true,
              quantity: true,
              productId: true, 
            }
          }
        }

      });

      return {
        ...order,
        OrderItem: order.OrderItem.map( (orderItem) => ({
          ...orderItem,
          name: products.find( product => product.id === orderItem.productId).name
        }) )
      }

    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Something wrong!!'
      });
    }

    // Con firstValueFrom se convierte de un Observable a un Promise
    
    
    
    
    // return {
    //   service: 'Orders MS',
    //   createOrderDto: createOrderDto,
    // }
    
    // return this.order.create({
    //   data: createOrderDto
    // });
  }

  async findAll(orderPaginationDTO: OrderPaginationDTO) {
    

    const totalPages = await this.order.count({
      where: {
        status: orderPaginationDTO.status
      }
    });

    const currentPage = orderPaginationDTO.page;
    const perPage = orderPaginationDTO.limit;

    return {

      data: await this.order.findMany({
        skip: ( currentPage - 1 ) * perPage,
        take: perPage,
        where: {
          status: orderPaginationDTO.status
        }
      }),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil( totalPages / perPage)
      }
    }
  }

  async findOne(id: string) {
    const order = await this.order.findFirst({
      where: { id : id},
      include:{
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            productId: true,
          }
        }
      }
    });

    if( !order ){
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Order with id: ${ id } not found`,
      });
    }
    //Regresar detalle de la OC

    //1) Tomar los id de los productos
    //2) Buscar en la db
    //3) Hacer la conexion
    //4) Cambiar el retorno
    const productIds = order.OrderItem.map( orderItem => orderItem.productId );
    const products: any[] =  await firstValueFrom ((this.productsClient.send({ cmd: 'validate_products'}, productIds)));

    return {
      ...order,
      OrderItem: order.OrderItem.map( orderItem => ({
        ...orderItem,
        name: products.find( product => product.id === orderItem.productId ).name,
      })),
    };
  }

  async findByStatus(status: string, orderPaginationDTO: OrderPaginationDTO){

    return{
      data: await this.order.findMany({
        where: {
          status: orderPaginationDTO.status,
        }
      })
    }

  }

  async changeStatus(changeOrderStatus: ChangeOrderStatusDTO){

    const { id, status } =  changeOrderStatus;

    const order = await this.findOne(id);

    //Si el estado de la orden es el mismo, se devuelve sin impactar a la DB
    if(order.status === status){
      return order;
    }

    return this.order.update({
      where: { id },
      data: {
        status: status
      }
    });

  }
>>>>>>> 1f59b87 (Codigo antes de NATS)

}
