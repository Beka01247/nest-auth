import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      return null;
    }

    const token = authorization.split(' ')[1];
    const jwtService = new JwtService({ secret: process.env.JWT_TOKEN });
    const decoded = jwtService.decode(token);

    return decoded;
  },
);
