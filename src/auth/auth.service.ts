import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'; 
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User_data } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { log } from 'console';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User_data)
    private readonly userRepository: Repository<User_data>
  ){}

  async create(userData: CreateUserDTO) {
    
    try {
      const {password, ...data}= userData;

      const user= this.userRepository.create({
        ...data,
        password : bcrypt.hashSync(password, 10)
      });

      
      const userCreated=await this.userRepository.save(user);
      delete userCreated.password;
      return userCreated;

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

    

  }
  

  private handleDBErrors(error:any){
 
    if(error.code=='23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Revisar logs')

    

  }
}
