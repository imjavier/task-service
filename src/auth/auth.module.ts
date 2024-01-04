import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_data } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({imports:[
    TypeOrmModule.forFeature([User_data]),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService)=>{

        console.log(ConfigService.get('JWT_SECRET'))
        return{
          secret: ConfigService.get('JWT_SECRET'),
          signOptions:{
            expiresIn:'1h'
          }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[TypeOrmModule]
})
export class AuthModule {}
