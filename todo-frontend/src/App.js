import React, {useState, useEffect} from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import ViewTodo from './components/ViewTodo';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import UpdatePage from './components/UpdatePage';
import axios from 'axios';
import {DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableSelectRow , TableContainer, Button} from 'carbon-components-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  Header,
  HeaderName,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem
} from "carbon-components-react/lib/components/UIShell";


function App() {

  const [todos, setTodos]= useState([]);
  const [currentUser, setCurrentUser]=useState("");

  useEffect(() => {

    // axios.get(`http://localhost:3001/todo`)
    //   .then(res => {
    //     const notes = res.data;
    //     setTodos(notes);
    //     //console.log(notes);
    //   })

      setCurrentUser(localStorage.getItem('user'))

  }, []);



  //adds todo to an array of todos
  function addTodo(todo){
    setTodos([...todos, todo]);

    const config= {
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    
    axios.post(`http://localhost:3000/todo`, { ...todo }, config)
      .then(res => {
       // setTodos([todo, ...todos]);
        //console.log(res);
        console.log(res.data);
      })
  }


  function toggleComplete(id){
    setTodos(todos.map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    }))

    axios.put(`http://localhost:3001/todo/${id}`)
      .then(res => {
        console.log(res);
        //console.log(res.data);
      })

  }



  const headers = [
    {
      key: 'completed',
      header: 'Completed',
    },
    {
      key: 'task',
      header: 'Task',
    },
    
  ];
  //header has not been added 

  function deleteRow(evt){
    
      const id=evt.target.value;
     // console.log("buttonCalled " + evt.target.value);
      setTodos(todos.filter(todo => todo.id !== id))

      axios.delete(`http://localhost:3001/todo/${id}`)
      .then(res => {
        console.log(res);
        //console.log(res.data);
      })
  }

  
    const [updateId, setUpdateId]= useState("");

    

    function handleLogout(){
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setCurrentUser("");
    }
    

  return (  
    <div className="App">


<Header aria-label="IBM Platform Name">
      <HeaderName href="#" prefix="">
        {currentUser}
      </HeaderName>
      <HeaderNavigation aria-label="IBM [Platform]">
        <HeaderMenuItem href={'/'}>Home</HeaderMenuItem>
        <HeaderMenuItem href={'/register'}>Register</HeaderMenuItem>
        <HeaderMenuItem href={'/login'}>Login</HeaderMenuItem>
        <HeaderMenuItem href={'/addtodo'}>Add Todo</HeaderMenuItem>
        <HeaderMenuItem href={'/viewtodo'}>View Todo</HeaderMenuItem>
        <HeaderMenuItem onClick={handleLogout}>Logout</HeaderMenuItem>
        
      </HeaderNavigation>
    </Header>

    <Router>
    <Routes>
              <Route exact path='/addtodo' element={<TodoForm addTodo={addTodo}/>} />
              <Route exact path='/viewtodo' element={<ViewTodo setUpdateId={setUpdateId}/>} />      
              <Route exact path='/' element={<Home/>} />  
              <Route exact path='/updatepage' element={<UpdatePage updateId={updateId} />} /> 
              <Route exact path='/register' element={<Register/>} />   
              <Route exact path='/login' element={<Login setCurrentUser={setCurrentUser}/>} />   
    </Routes>

    </Router>

      
         
          
    </div>
  );
}

export default App;

