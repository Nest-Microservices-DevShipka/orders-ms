import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
<<<<<<< HEAD
=======
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SERVICE } from 'src/config';
>>>>>>> 1f59b87 (Codigo antes de NATS)

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
<<<<<<< HEAD
=======
  imports:[
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options:{
          host: envs.productsMicroservicesHost,
          port: envs.productsMicroservicesPort,
        }
      },
    ]),
  ]

>>>>>>> 1f59b87 (Codigo antes de NATS)
})
export class OrdersModule {}
