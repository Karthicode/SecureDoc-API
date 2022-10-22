import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class ValidateAuthHeader implements NestMiddleware {
  constructor(private readonly service: AuthService) {

  }
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const decodedVal = Buffer.from(
        req.headers.authorization.split(' ')[1],
        'base64',
      )
        .toString()
        .split(':');
      if (!decodedVal) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Forbidden' })
      }
      const authenticatedUser = await this.service.findByUsername(decodedVal[0])
      if (authenticatedUser) {
        const match = await bcrypt.compare(decodedVal[1], authenticatedUser.password)
        if (match){
          req.body.authenticatedUser = authenticatedUser
        }    
      }     
      next();
    } catch (error) {
      throw new BadRequestException({
        statusCode: '400',
        message: 'Missing or invalid Authorization credentials',
      });
    }
  }
}
