// Esto se guardo en un snippet con el comando: micro-envs

import 'dotenv/config';
import * as joi from 'joi';

//valida que el puerto sea un numero
interface EnvVars{
    PORT: number;
<<<<<<< HEAD
=======
    PRODUCTS_MICROSERVICE_PORT: number;
    PRODUCTS_MICROSERVICE_HOST: string;
>>>>>>> 1f59b87 (Codigo antes de NATS)
}

// El puerto tiene que ser obligatorio

const envSchema = joi.object({

    PORT: joi.number().required(),
<<<<<<< HEAD
=======
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
>>>>>>> 1f59b87 (Codigo antes de NATS)
})
.unknown(true);

// desestructura esas variables del .env
const { error, value } = envSchema.validate( process.env );

//creacion del mensaje de error
if(error){
    throw new Error(`Config validation error: ${error.message}`);
}

//cambia tipo de dato de any a number
const envVars: EnvVars = value;

export const envs ={
    port: envVars.PORT,
<<<<<<< HEAD
=======

    productsMicroservicesHost: envVars.PRODUCTS_MICROSERVICE_HOST,
    productsMicroservicesPort: envVars.PRODUCTS_MICROSERVICE_PORT,
>>>>>>> 1f59b87 (Codigo antes de NATS)
}