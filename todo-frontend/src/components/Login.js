import React, { useState } from "react";
import { Form, TextInput, TextArea, Select, SelectItem, Button } from 'carbon-components-react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";



function Register({setCurrentUser}){


    const [user, setUser]=useState({    
        email: "",
        password: ""
    });

    function login() {
        return new Promise(function(resolve) {
            setTimeout(function() {
                axios.post('http://localhost:3000/auth', user)
         .then(res=>{
            localStorage.setItem('token', res.data.access_token)
             console.log(res)
            })
         .catch(err=>{console.log("Error is "+err)})
                resolve();
            }, 500)
        });
    }


    function setUsername() {
        return new Promise(function(resolve) {

            setTimeout(function() {

        //     const config= {
        //     headers:{
        //       Authorization: 'Bearer ' + localStorage.getItem('token')
        //     }
        //   };

         axios.get('http://localhost:3000/auth', user.email)
          .then(res => {
            localStorage.setItem('user', res.data.username)
            console.log(res)
            console.log("user added to localstorage " +user.email);
          })
          .catch(err=>{
              console.log("Error in login "+err)
              console.log("token is " +localStorage.getItem('token'))
              console.log("user email "+user.email)
              console.log("user password "+user.password)
              //console.log(config)
            })
                resolve();
            }, 500);
        });
    }
    
    let navigate = useNavigate(); 

      function handleSubmit(evt){
    
        evt.preventDefault()
        

        // axios.post('http://localhost:3000/auth', user)
        //  .then(res=>{
        //     localStorage.setItem('token', res.data.access_token)
        //      console.log(res)
        //      navigate('/')
        //     })
        //  .catch(err=>{console.log("Error is "+err)})
  
                login().then(setUsername)
                .then(
                    setTimeout(function(){
                        console.log("aaaaaaaaaaaaa "+localStorage.getItem('user'))
                        setCurrentUser(localStorage.getItem('user'))
                    },3000)
                )
                    
                navigate('/')
                //setCurrentUser(localStorage.getItem('user'));

        //  const config= {
        //     headers:{
        //       Authorization: 'Bearer ' + localStorage.getItem('token')
        //     }
        //   };

        //   axios.get('http://localhost:3000/auth', user, config)
        //   .then(res => {
        //     localStorage.setItem('user', res.data.username)
        //     console.log(res)
        //     //console.log(notes);
        //   })
        //   .catch(err=>{
        //       console.log("Error in login "+err)
        //       console.log("token is " +localStorage.getItem('token'))
        //     })

    
        
        setUser({
            email: "",
            password: ""
        })

        toast("Login Successful!!");
    
      }
    
    function handleEmailInputChange(e){
        setUser({...user, email: e.target.value});
    }

    function handlePasswordInputChange(e){
      setUser({...user, password: e.target.value});
    }


    return(
        <div className="App">
            <header className="App-header">
                
            <h2>Todo</h2>

        <Form onSubmit={handleSubmit}>

                <TextInput
                style={{width: "500px", marginBottom: "10px"}}
                id="test2"
                invalidText="Invalid error message."
                labelText="Email"
                placeholder="Enter email"
                name="email"
                value={user.email}
                onChange={handleEmailInputChange}
                />

                <TextInput
                style={{width: "500px", marginBottom: "10px"}}
                id="test3"
                invalidText="Invalid error message."
                labelText="password"
                placeholder="Enter password"
                name="Password"
                value={user.password}
                type="password"
                onChange={handlePasswordInputChange}
                />
            
                
                <Button
                    style={{paddingLeft: "55px"}}
                    kind="primary"
                    tabIndex={0}
                    type="submit"
                >
                    Login
                </Button>
                <ToastContainer />
        </Form>

            </header>
        </div>
    )
}

export default Register;