import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Put,
  Header,
  Req,
  UseInterceptors,
  Res,
  HttpCode,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('v1/account')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('')
  @HttpCode(200)
  createUser(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Get(':id')
  signin(@Req() req:Request,@Param('id') id: any,res:Response) {
    return this.authService.getUser(req,id,res);
  }

  @Put(':id')
  @HttpCode(204)
  updateUser(@Req() req:Request,@Param('id') id: string, @Body() dto: AuthDto,@Res() res:Response) {
    return this.authService.updateUser(req,id, dto,res);
  }
}
