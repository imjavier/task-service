import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_data } from './entities/user.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([User_data]), AuthModule,],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
