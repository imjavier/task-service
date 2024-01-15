import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'; 
 
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
 
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private jwtAuthService: JwtService
  ){}

  async generateJWT(payload){

    return await this.jwtAuthService.signAsync({payload});

  }
  
  encryptPassword(password: string){
    return bcrypt.hashSync(password,10);
  }

  comparePasswords(password, hash){
    return bcrypt.compareSync(password,hash);

  }

  private handleDBErrors(error:any){
 
    if(error.code=='23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Revisar logs')

    

  }
}
