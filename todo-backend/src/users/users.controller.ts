import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthLoginDto } from 'src/auth/dto/auth-login.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }

  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  //@UseGuards(JwtAuthGuard)
  @Get('getemail')
  async findByEmail(@Body() authLoginDto: AuthLoginDto) {
    return this.usersService.findByEmail(authLoginDto.email);
  }

 
}
