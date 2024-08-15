import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class TryCatchInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((err) => {
        console.log(err);

        if (err instanceof BadRequestException) {
          throw new BadRequestException(err.message);
        }
        throw new NotFoundException();
      }),
    );
  }
}
