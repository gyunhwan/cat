import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class SimpleGuard implements CanActivate {
  constructor(private reflactor: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    const token: string = req.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException('token_not_found');
    }
    if (token !== 'MY_AUTH_TOKEN') {
      throw new UnauthorizedException('invalid_token');
    }
    return true;
  }
}
