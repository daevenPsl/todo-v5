import React, { useState } from "react";
import {v4 as uuidv4} from "uuid";
import '../App.css';
import {DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableSelectRow , TableContainer, Button} from 'carbon-components-react';
import { Form, TextInput, TextArea, Select, SelectItem } from 'carbon-components-react';

function TodoForm({addTodo}){

    const [todo, setTodo]=useState({
        id: "",
        task: "",
        completed: false
    });

    const toggleToast=false;

    function handleTaskInputChange(e){
        setTodo({...todo, task: e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        //only gets called if task not empty
        //trim removes whitespace from string
        if(todo.task.trim()){

            console.log("add called")
            //add id before passing it to app.js using uuid
            addTodo({...todo, id: uuidv4()});

            //reset tasktodo with empty string
            setTodo({...todo, task: ""});
        }
    }

    return(
        <div className="App">
            <header className="App-header">
                {/* <form onSubmit={handleSubmit}>
                    <input name="task" type="text" value={todo.task} onChange={handleTaskInputChange}></input>
                    <button type="submit"> Add</button>
                </form> */}
            <h2>Todo</h2>

        <Form onSubmit={handleSubmit}>
                <TextInput
                style={{width: "500px", marginBottom: "10px"}}
                id="test2"
                invalidText="Invalid error message."
                labelText="Tasks"
                placeholder="Enter todo task"
                name="task"
                value={todo.task}
                onChange={handleTaskInputChange}
                />
            
                
                <Button
                    style={{paddingLeft: "55px"}}
                    kind="primary"
                    tabIndex={0}
                    type="submit"
                >
                    Add task
                </Button>
        </Form>

            </header>
        </div>
    )
}

export default TodoForm;