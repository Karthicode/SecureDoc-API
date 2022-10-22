import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//import { LoggingInterceptor } from './interceptor/logging.interceptor';

// import { LocalAuthGuard } from './auth/guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalInterceptors(new LoggingInterceptor());
  //app.useGlobalGuards(new LocalAuthGuard())
  await app.listen(3001);
}
bootstrap();
