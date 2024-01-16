import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Not, Repository } from 'typeorm';
import { User_data } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { PayloadInterface } from './interfaces/payload.interface';
import { LoginUserDto } from './dto/login-user.dto';
//se crea un servicio que recibe un administrador de repositorio adaptable(se adapta a User Data) 
// que al crearse le añade funcionalidad extra al administrador de repositorio (configuración a la base de datos) 
@Injectable()
export class UserService {
constructor(
  private readonly authService:AuthService ,
  @InjectRepository(User_data)
  private readonly userRepository: Repository<User_data>,
){}

   
/*SE REALIZÓ EL METODO CREATE EL CUAL ENVIARÁ  LOS DATOS DEL USUARIO A CREAR
EN EL CONTROLADOR DE REGISTRO COMÚN SE ELIMINARÁ EL ATRIBUTO ROL EN CASO DE TENERLO YA QUE ESTE SE AGREGARÁ POR DEFECTO COMO USUARIO NORMAL
EN CASO DE QUE SEA EL ADMIN EL QUE VAYA A HACER UN REGISTRO, ESTE SE DEJARÁ INSERTAR POR CUENTA PROPIA, YA QUE ÉL DEFINIRÁ LOS PERMISOS DEL NUEVO USUARIO

¡ACLARACIÓN! : SE VERIFICARÁ EL TOKEN PARA ASÍ VERIFICAR LA AUTORIZACIÓN DEL SUPERADMIN, ADMIN, COMMON USER

*/
  async login(loginUserDto: LoginUserDto){
    const {username,password} = loginUserDto;

    const user= await this.findOneByUsername(username);
    if(!user) throw new BadRequestException('Credentials not valid');

    const passwordVerification=this.authService.comparePasswords(password,user.password);

    if(!passwordVerification) throw new BadRequestException('Credentials not valid');

   console.log(user)
    const accessToken= this.authService.generateJWT({
        id:user.id,
        username:user.username,
        rol:user.rol
    });
   
    return accessToken;
  }


  async create(createUserDto: CreateUserDto){

    try {

      const {password, ...userData} = createUserDto; 
       
      const user=this.userRepository.create({
          ...userData,
          password: this.authService.encryptPassword(password)
        }
      );
      await this.userRepository.save(user);
      
      const payload={
        id:user.id,
        username:user.username,
        rol:user.rol
      };
      const token = await this.authService.generateJWT(payload);

      return token;

    } catch (error) {
 
      this.handleDBErrors(error);
    }

  }
 

  findAll() {
    return this.userRepository.find();
  }

  
  findOneByUsername(username:string) {
    
    return this.userRepository.findOne({where:{username}});
  }  
  findOneByID(id:string) {
    
    return this.userRepository.findOne({where:{id}});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
 
    
    try {
      
      const preloadedUser= await this.userRepository.preload({
        id,
        ...updateUserDto
      });

      return await this.userRepository.save(preloadedUser); 

    } catch (error) {
      this.handleDBErrors(error)
    
    }
 
 

    return `This action updates a #${id} user`;
  }

  //ELIMINACIÓN DE USUARIOS CREADA CORRECTAMENTE

  /*fALTA IMPLEMENTAR LO DE LOS ROLES Y ALGUNA QUE OTRA
  FUNCION MAS */ 
  async remove(id: string, payloadID: string) {

    console.log(`Id ${id} payload: ${payloadID}`)
    if(payloadID!=id) throw new UnauthorizedException('non-eliminable user');
    try {

      return await this.userRepository.delete({id:id});
    } catch (error) {
      console.log(error)
      this.handleDBErrors(error)
    }

  }
  
  private handleDBErrors(error){
    if (error.code == '22P02') throw new BadRequestException('User with ID not found')

    if (error.code=='23505') throw new BadRequestException(error.detail);

    if (error.code=='2305') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException('Revisar logs');

  }

}
