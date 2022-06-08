import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    switch (status) {
      case 500:
        return response.redirect('/error/500');
      case 503:
        return response.redirect('/error/503');
      case 404:
        return response.redirect('/error/404');
      case 403:
        return response.redirect('/error/403');
      default:
        return response.redirect('/error/404');
    }
  }
}
