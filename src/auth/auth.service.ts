import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'; 
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User_data } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  private handleDBErrors(error:any){
 
    if(error.code=='23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Revisar logs')

    

  }
}
