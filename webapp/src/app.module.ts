import { Module } from '@nestjs/common';
import { TestModule } from './test/test.module';
import 'reflect-metadata';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [TestModule, AuthModule, PrismaModule],
})
export class AppModule {}
