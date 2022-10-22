import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './guard/local.strategy';
import { ValidateAuthHeader } from './middlewares/validate-header.middleware';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateAuthHeader)
      .forRoutes(
        { path: '/v1/account/:id', method: RequestMethod.GET },
        { path: '/v1/account/:id', method: RequestMethod.PUT },
      );
  }
}
