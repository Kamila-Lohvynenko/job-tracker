import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import { Observable, map } from 'rxjs';

type MessagePayload<T = unknown> = {
  message: string;
  data?: T;
};

export type ApiResponse<T = unknown> = {
  success: boolean;
  status: number;
  message?: string;
  errors?: string[];
  data: T | null;
};

function isMessagePayload<T = unknown>(
  value: unknown,
): value is MessagePayload<T> {
  return (
    !!value &&
    typeof value === 'object' &&
    typeof (value as Record<string, unknown>).message === 'string' &&
    Object.keys(value).every((key) => key === 'message' || key === 'data')
  );
}

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    if (context.getType() !== 'http') {
      return next.handle() as Observable<ApiResponse<T>>;
    }

    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((payload: T) => {
        const status = response.statusCode;

        if (isMessagePayload(payload)) {
          return {
            success: true,
            status,
            message: payload.message,
            data: (payload.data ?? null) as T | null,
          };
        }

        return {
          success: true,
          status,
          data: (payload ?? null) as T | null,
        };
      }),
    );
  }
}
