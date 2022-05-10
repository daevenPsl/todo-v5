import React, { useState, useEffect } from "react";
import axios from "axios";
import {DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableSelectRow , TableContainer, Button} from 'carbon-components-react';
import '../App.css';

import { useNavigate } from "react-router-dom";
import Home from './Home';

function ViewTodo({setUpdateId}){

    const [todos, setTodos]= useState([]);

    

    useEffect(() => {

      const config= {
        headers:{
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      };
      
        axios.get('http://localhost:3000/todo', config)
          .then(res => {
            const notes = res.data;
            setTodos(notes);
            //console.log(notes);
          })
          .catch(err=>{console.log("Error in viewtodo "+err)})
    
      }, []);

    

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

    const config= {
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };

    axios.put(`http://localhost:3000/todo/${id}`, config)
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

      const config= {
        headers:{
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      };

      axios.delete(`http://localhost:3000/todo/${id}`, config)
      .then(res => {
        console.log(res);
        //console.log(res.data);
      })
      .catch(err=>{console.log("Error in viewtodo delete "+err)})
  }


  let navigate = useNavigate(); 

  const routeChange = (evt) =>{ 
    const id=evt.target.value;
    //getIdToUpdate(id);
    console.log("route changed called with id "+ id)
    setUpdateId(id);
    navigate('/updatepage')
  }



  // useEffect(()=>{

  //   axios.get('http://localhost:3000/auth', config)
  //       .then(res=>{
  //         console.log("Response from viewtodo "+res)
  //       })
  //       .catch(err=>{console.log("Error is "+err)})
  // },[])

    return(
      <div className="App">
        <header className="App-header">
          <h2 style={{marginTop: "20px"}}>Todos</h2>
        <DataTable
        rows={todos}
        headers={headers}
        render={({
        rows,
        headers,
        getHeaderProps,
        getSelectionProps,
        selectAll,
        selectedRows
        }) => (
        <React.Fragment>
            <TableContainer>
            <Table>
                
                <TableBody>
                {rows.map(row => (
                    <TableRow key={row.id}>
                    <TableSelectRow   {...getSelectionProps({ row, onClick: () => toggleComplete(row.id) })} />
                    {row.cells.map(cell => {
                        //console.log(row);
                    // console.log(cell.value);
                    if(row.isSelected === true)
                        return <TableCell style={{color: "black", textDecoration: cell.value ? "line-through" : null}}  key={cell.id}>{cell.value}</TableCell>

                        return <TableCell  key={cell.id}>{cell.value}</TableCell>
                    })}
                                        
                <Button onClick={deleteRow} value={row.id}>Delete</Button>
                <Button onClick={routeChange}  value={row.id}>Update</Button>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </React.Fragment>
        )}
        />
        </header>
        </div>
    )
}

export default ViewTodo;