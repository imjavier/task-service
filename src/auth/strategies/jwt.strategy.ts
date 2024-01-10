import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User_data } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { UnauthorizedException, Delete } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User_data)
        private readonly userRepository: Repository<User_data>,
        configService:ConfigService
    ){
        
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
           
        });
    }

    async validate(payload): Promise<User_data>{
        const {username}=payload;
        const user= await this.userRepository.findOneBy({username:payload.username});
        if(!user) throw new UnauthorizedException('Token not valid ');
        delete user.password;

        return user;
    }

}