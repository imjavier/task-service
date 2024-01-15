import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
 
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { UnauthorizedException } from "@nestjs/common";
import { User_data } from "src/user/entities/user.entity";
 

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User_data)
        private readonly userRepository: Repository<User_data>
        ,
        private readonly configService:ConfigService
    ){
        
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
           
        });
    }

    async validate(jwt){
           
  
         
        const user = await this.userRepository.findOne({where:{username:jwt.payload.username}});
        if(!user) throw new UnauthorizedException('Token not valid');
 
        return user;
    }

}