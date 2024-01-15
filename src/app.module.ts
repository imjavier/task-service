import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
        type:'postgres',
        host: process.env.HOST,
        port: +process.env.PORT,
        database: process.env.DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.PASSWORD,
        autoLoadEntities:true,
        synchronize:true

    }),
    UserModule,
    TaskModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
