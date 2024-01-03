import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_data } from './entities/user.entity';

@Module({imports:[TypeOrmModule.forFeature([User_data])],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[TypeOrmModule]
})
export class AuthModule {}
