/* eslint-disable */

import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


import { UsersModule } from './users/users.module';
//import { AuthModule } from './auth/auth.module';

import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true,
    }),
    TodoModule,
    UsersModule,
    AuthModule,
  ],
  
})
export class AppModule {}
