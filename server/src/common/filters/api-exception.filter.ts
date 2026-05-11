import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import type { ApiResponse } from '../interceptors/api-response.interceptor.js';

function getExceptionPayload(exception: HttpException): unknown {
  return exception.getResponse();
}

function resolveErrors(exception: unknown): string[] | undefined {
  if (!(exception instanceof HttpException)) {
    return undefined;
  }

  const payload = getExceptionPayload(exception);

  if (!payload || typeof payload !== 'object') {
    return undefined;
  }

  const message = (payload as Record<string, unknown>).message;

  if (!Array.isArray(message)) {
    return undefined;
  }

  const errors = message.filter(
    (entry): entry is string => typeof entry === 'string',
  );

  return errors.length > 0 ? errors : undefined;
}

function resolveMessage(exception: unknown, errors?: string[]): string {
  if (errors?.length) {
    return 'Validation failed';
  }

  if (exception instanceof HttpException) {
    const payload = getExceptionPayload(exception);

    if (typeof payload === 'string') {
      return payload;
    }

    if (payload && typeof payload === 'object') {
      const message = (payload as Record<string, unknown>).message;

      if (typeof message === 'string') {
        return message;
      }
    }

    return exception.message;
  }

  return 'Internal server error';
}

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    if (host.getType() !== 'http') {
      return;
    }

    const response = host.switchToHttp().getResponse<Response>();

    const status: HttpStatus =
      exception instanceof HttpException
        ? (exception.getStatus() as HttpStatus)
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (
      status === HttpStatus.INTERNAL_SERVER_ERROR &&
      exception instanceof Error
    ) {
      this.logger.error(exception.message, exception.stack);
    }

    const errors = resolveErrors(exception);

    const body: ApiResponse<null> = {
      success: false,
      status,
      message: resolveMessage(exception, errors),
      data: null,
    };

    if (errors) {
      body.errors = errors;
    }

    response.status(status).json(body);
  }
}
