import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_data } from 'src/user/entities/user.entity';

@Module({imports:[ 
    TypeOrmModule.forFeature([User_data]),
    ConfigModule,
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=>{

     
        return{
          secret: configService.get('JWT_SECRET'),
          signOptions:{
            expiresIn:'3h'
          }
        }
      }             
    }),
 
  ],
  providers: [AuthService,JwtStrategy],
  exports:[  JwtStrategy, PassportModule, JwtModule, AuthService  ]
})
export class AuthModule {} 
 