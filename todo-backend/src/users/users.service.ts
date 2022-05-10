
import { Injectable } from '@nestjs/common';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { userInfo } from 'os';

@Injectable()
export class UsersService {

  async create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto);
    await user.save();

    delete user.password;
    return user;
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);

    delete user.password;
    return user;
  }

  
  async findById(id: number) {
    return await User.findOne(id);
  }

  async findAllUsers() {
    return await User.find();
  }


  async findByEmail(email: string): Promise<User> {
    
    const user =  await User.findOne({
      where: {
        email: email,
      },
    });

    return user;

    // return await User.findOne({
    //   where: {
    //     email: email,
    //   },
    // });
    
  }
  

  async findEmail(email: string): Promise<User> {
    const user = await User.findOne(email);

    delete user.password;
    return user;
  }
  
}
