import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';

<<<<<<< HEAD

@Module({
  imports: [OrdersModule],

=======
@Module({
  imports: [OrdersModule],
  controllers: [],
  providers: [], 
>>>>>>> 1f59b87 (Codigo antes de NATS)
})
export class AppModule {}
