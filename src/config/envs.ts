// Esto se guardo en un snippet con el comando: micro-envs

import 'dotenv/config';
import * as joi from 'joi';

//valida que el puerto sea un numero
interface EnvVars{
    PORT: number;
    // PRODUCTS_MICROSERVICE_PORT: number;
    // PRODUCTS_MICROSERVICE_HOST: string;
    
    NATS_SERVERS: string[];
}

// El puerto tiene que ser obligatorio

const envSchema = joi.object({

    PORT: joi.number().required(),
    // PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    // PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    
    NATS_SERVERS: joi.array().items( joi.string() ).required(),
})
.unknown(true);

// desestructura esas variables del .env
const { error, value } = envSchema.validate( {
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
} );

//

//creacion del mensaje de error
if(error){
    throw new Error(`Config validation error: ${error.message}`);
}

//cambia tipo de dato de any a number
const envVars: EnvVars = value;

export const envs ={
    port: envVars.PORT,

    natsServers: envVars.NATS_SERVERS,

    // productsMicroservicesHost: envVars.PRODUCTS_MICROSERVICE_HOST,
    // productsMicroservicesPort: envVars.PRODUCTS_MICROSERVICE_PORT,
}