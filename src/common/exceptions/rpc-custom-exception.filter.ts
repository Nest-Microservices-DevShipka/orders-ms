import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  
    catch(exception: RpcException, host: ArgumentsHost) {
      
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      const rpcError = exception.getError();
      
      if(typeof rpcError === 'object' && 
        'status' in rpcError && 
        'message' in rpcError
      ){
        //si no es un numero sera un bad reuqest(400) pero si es un numero le pondra en status enviado
        const status = isNaN(+rpcError.status) ? 400 :+rpcError.status;
        return response.status(status).json(rpcError);
      }

      response.status(401).json({
        status: 401,
        message: rpcError,
      })
  }
}