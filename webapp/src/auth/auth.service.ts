import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Response, Request } from 'express';
import { PrismaService } from 'src/prisma';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }
  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      const verifyPassword = await bcrypt.compare(pass, user.password);
      if (user && verifyPassword) {
        return user;
      }

      return null;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2001') {
          console.log('In');
          throw new ForbiddenException('Email not found');
        }
        throw new BadRequestException();
      }
    }
  }
  async signup(dto: AuthDto) {
    const saltOrRounds = 10;
    const password = dto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    try {
      const user = await this.prisma.user.create({
        data: {
          first_name: dto.first_name,
          last_name: dto.last_name,
          username: dto.username,
          password: hash,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Email already in use');
        }
      }
      throw new BadRequestException();
    }
  }
  async getUser(req: Request, param_id: string, res: Response) {
    
    try {
      const authenticatedUser = req.body.authenticatedUser;
      if (authenticatedUser == 'undefined') {
        return;
      }
      if (authenticatedUser.id !== req.params.id || req.params.id === 'undefined'){
        return;
      }
      const user = await this.prisma.user.findFirst({
        where: {
          id: param_id,
        },
      });
      if (!user) throw new ForbiddenException('User not found');
      delete user.password;
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  async findByUsername(username: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          username: username,
        },
      });
      if (!user) throw new ForbiddenException('User not found');
      return user;
    } catch (error) {
      throw new BadGatewayException();
    }
  }
  async updateUser(
    req: Request,
    param_id: string,
    dto: AuthDto,
    res: Response,
  ) {
 
    try {
      console.log('IN')
      const authenticatedUser = req.body.authenticatedUser;
      if (authenticatedUser == 'undefined') {
        return;
      }
      if (authenticatedUser.id !== req.params.id || req.params.id === 'undefined'){
        return;
      }
      const saltOrRounds = 10;
      const password = dto.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      const user = await this.prisma.user.update({
        where: {
          id: param_id,
        },
        data: {
          first_name: dto?.first_name,
          last_name: dto?.last_name,
          password: hash,
        },
      });
      delete user.password;
      res.set({ status: '204 No Content' }).send();
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2001') {
          throw new ForbiddenException('Email not found with given ID');
        }
      }

      throw new BadRequestException();
    }
  }
}
