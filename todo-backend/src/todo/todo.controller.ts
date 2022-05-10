/* eslint-disable */

import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { todoDto } from './todo.dto';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('todo')
export class TodoController {

    constructor(private todoService : TodoService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    public getTodos(){
        return this.todoService.getTodos();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    public postTodos(@Body() todo: todoDto){
        return this.todoService.postTodos(todo);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    public async deleteTodo(@Param('id') id:string){
        return this.todoService.deleteTodo(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    public async updateTodo(@Param('id') id:string ){
        
        return this.todoService.updateTodo(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    public async putCarById(@Param('id') id:string, @Query() query ){
        const taskValue = query.task;
        //const propertyValue= query.property_value;
        return this.todoService.putTodoById(id, taskValue);
    }
}
