import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GaufresModule } from '../gaufres/gaufres.module';

@Module({
  imports: [GaufresModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
