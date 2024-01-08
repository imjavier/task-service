import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_data } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({imports:[
    ConfigModule,
    TypeOrmModule.forFeature([User_data]),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService)=>{

     
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
  providers: [AuthService,JwtStrategy],
  exports:[TypeOrmModule, JwtStrategy, PassportModule, JwtModule  ]
})
export class AuthModule {} 
