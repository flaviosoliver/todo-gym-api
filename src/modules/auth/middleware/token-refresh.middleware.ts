import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenRefreshMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
      try {
        const decoded = this.jwtService.verify(token) as any;
        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (decoded.exp - currentTimestamp < 172800) {
          const newToken = this.jwtService.sign({ username: decoded.username });
          res.setHeader('Authorization', `Bearer ${newToken}`);
        }
      } catch (e) {
        console.error(e);
      }
    }
    next();
  }
}
