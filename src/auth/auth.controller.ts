import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
 

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.authService.create(createUserDTO);
  }

  @Post('login')
  loginUser(@Body() loginUserDTO: CreateUserDTO){


  }

  @Get('av')
  @UseGuards(JwtAuthGuard   )
  strag(@Body()data){
    return 'f'

  }

}
