import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE, envs } from 'src/config';

@Module({

    imports: [
        ClientsModule.register([
            {
                name: NATS_SERVICE, // se ocupa para inyectar los MS en los controladores o en otras partes
                // Tiene que tener el mismo protocolo que en el servicio (TCP en MS products) eso se ve en el main del MS
                transport: Transport.NATS,

                options: {
                    servers: envs.natsServers,
                }

            },

        ]),

    ],

    exports: [
        ClientsModule.register([
            {
                name: NATS_SERVICE, // se ocupa para inyectar los MS en los controladores o en otras partes
                // Tiene que tener el mismo protocolo que en el servicio (TCP en MS products) eso se ve en el main del MS
                transport: Transport.NATS,
                options: {
                    servers: envs.natsServers,

                }

            },

        ]),
    ]

})
export class NatsModule { }
