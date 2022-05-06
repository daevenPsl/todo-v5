import React, {useState, useEffect} from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import ViewTodo from './components/ViewTodo';
import Home from './components/Home';
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

  useEffect(() => {

    axios.get(`http://localhost:3001/todo`)
      .then(res => {
        const notes = res.data;
        setTodos(notes);
        //console.log(notes);
      })

  }, []);



  //adds todo to an array of todos
  function addTodo(todo){
    setTodos([...todos, todo]);

    axios.post(`http://localhost:3001/todo`, { ...todo })
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
    
    function getIdToUpdate(id){
      setUpdateId(id);
      console.log("getIdToUpdate--------" + updateId)
    }

  return (  
    <div className="App">


<Header aria-label="IBM Platform Name">
      <HeaderName href="#" prefix="IBM">
        [Platform]
      </HeaderName>
      <HeaderNavigation aria-label="IBM [Platform]">
        <HeaderMenuItem href={'/'}>Home</HeaderMenuItem>
        <HeaderMenuItem href={'/addtodo'}>Add Todo</HeaderMenuItem>
        <HeaderMenuItem href={'/viewtodo'}>View Todo</HeaderMenuItem>
        
      </HeaderNavigation>
    </Header>

    <Router>
    <Routes>
              <Route exact path='/addtodo' element={<TodoForm addTodo={addTodo}/>} />
              <Route exact path='/viewtodo' element={<ViewTodo getIdToUpdate={getIdToUpdate}/>} />      
              <Route exact path='/' element={<Home/>} />  
              <Route exact path='/updatepage' element={<UpdatePage updateId={updateId} />} />   
    </Routes>

    </Router>

      
      {/* <header className="App-header">
      <h1>ToDo</h1>
      <TodoForm addTodo={addTodo}/>

      <Router>
        <div>
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          
            <h1><Link to={'/addtodo'} className="nav-link"> Add Todo </Link> <br/></h1>
            <h1><Link to={'/viewtodo'} className="nav-link">View  Todos</Link></h1>
            
         
          </nav>
         
          <Routes>
              <Route exact path='/addtodo' element={<TodoForm addTodo={addTodo}/>} />
              <Route path='/viewtodo' element={<ViewTodo/>} />
              
          </Routes>
        </div>
      </Router>
      
      </header> */}
    </div>
  );
}

export default App;



{/* <TodoForm addTodo={addTodo}/> */}





// <DataTable
// rows={todos}
// headers={headers}
// render={({
//   rows,
//   headers,
//   getHeaderProps,
//   getSelectionProps,
//   selectAll,
//   selectedRows
// }) => (
//   <React.Fragment>
//     <TableContainer>
//       <Table>
        
//         <TableBody>
//           {rows.map(row => (
//             <TableRow key={row.id}>
//               <TableSelectRow   {...getSelectionProps({ row, onClick: () => toggleComplete(row.id) })} />
//               {row.cells.map(cell => {
//                 //console.log(row);
//               // console.log(cell.value);
//               if(row.isSelected === true)
//                   return <TableCell style={{color: "white", textDecoration: cell.value ? "line-through" : null}}  key={cell.id}>{cell.value}</TableCell>

//                 return <TableCell   key={cell.id}>{cell.value}</TableCell>
//               })}
                                  
//           <Button onClick={deleteRow} value={row.id}>Delete</Button>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   </React.Fragment>
// )}
// />