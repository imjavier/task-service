import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'; 
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User_data } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User_data)
    private readonly userRepository: Repository<User_data>,
    private jwtAuthService: JwtService
  ){}

  async create(userData: CreateUserDTO) {
    
    try {
      const {password, ...data}= userData;

      const user= this.userRepository.create({
        ...data,
        password : bcrypt.hashSync(password, 10)
      });

      
      const userCreated=await this.userRepository.save(user);
      const token= await this.generateJWT(userCreated);

      return token;
       

    } catch (error) {
     
      this.handleDBErrors(error)
    }
 
  }

  async login(loginUserDTO:CreateUserDTO){
    const {username, password}=loginUserDTO;
    const user=await this.userRepository.findOne({
      where:{ username},
      select:{username:true,password:true}
    });

    if(!user) throw new NotFoundException('Email is not valid');

    if(!bcrypt.compareSync(password,user.password)) throw new NotFoundException('Password is not valid');

    const token= await this.generateJWT(user);  

    return token;

    

  }
  
  private async generateJWT(payload){

    return await this.jwtAuthService.signAsync({username:payload.username});

  }
  

  private handleDBErrors(error:any){
 
    if(error.code=='23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Revisar logs')

    

  }
}
