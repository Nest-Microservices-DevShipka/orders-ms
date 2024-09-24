import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { env } from 'process';

async function bootstrap() {

  const logger =  new Logger('Orders-MS');


  // const app = await NestFactory.create(AppModule); //con el create es una apiRest
  
  //Aqui ya se convierte en servicio con createMicroservice
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, { 

      transport: Transport.TCP,
      options: {
        port: envs.port
      }

  });

  logger.log(`Orders-MS running on port: ${envs.port}`);
}
bootstrap();
