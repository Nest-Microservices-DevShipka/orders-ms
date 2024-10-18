# Orders MicroService

```
# PrismaClientInitializationError: Can't reach database server at `localhost:5432`
docker compose up -d
```
## INFO
1. Clonar el repositorio
2. Instalar dependencias
3. Crear archivo `.env` basado en el `env.template`
4. Levantar el servidor de NATS

```
## Nats
docker run -d --name nats-server -p 4222:4222 -p 8222:822
2 nats
```