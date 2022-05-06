/* eslint-disable */

import { Injectable, HttpException } from '@nestjs/common';
import { TODOS } from './todos.mock';

@Injectable()
export class TodoService {

    private todos= TODOS;

    public getTodos(){
        return this.todos;
    }

    public  postTodos(todo){
        //add todo to todos
        return this.todos.push(todo);
    }




    public  deleteTodo(id: string): Promise<any>{

        //const todoId= String(id);
        
        const todoId = id.replace(/(\r\n|\n|\r)/gm, "");

        return new Promise((resolve) => {
        
        const index=this.todos.findIndex((todo) => todo.id === todoId);
        //const index=this.todos.findIndex((todo) => todo.id === id); //returns index

        if(index === -1){
            
            throw new HttpException('Not found', 404);
        }

        this.todos.splice(index,1)
        
        return resolve(this.todos);
    })
    }


    public  updateTodo(id: string): Promise<any>{

       
        return new Promise((resolve) => {

        const index=this.todos.findIndex((todo) => todo.id === id); //returns index

        if(index === -1){
            throw new HttpException('Not found', 404);
        }

        this.todos[index]['completed']= !this.todos[index]['completed'];

        return resolve(this.todos);

    })
    }



    public  putTodoById(id: string, taskValue: string): Promise<any>{

        const todoId= id;
        return new Promise((resolve) => {

        const index=this.todos.findIndex((todo) => todo.id === todoId); //returns index

        if(index === -1){
            throw new HttpException('Not found', 404);
        }

        this.todos[index]['task']=taskValue;

        return resolve(this.todos);
        
    })
    }

}
