import React, { useState } from "react";
import { Form, TextInput, TextArea, Select, SelectItem, Button } from 'carbon-components-react';
import axios from "axios";

function Register(){


    const [user, setUser]=useState({
        username: "",
        email: "",
        password: ""
    });
    
      function handleSubmit(evt){
    
        evt.preventDefault()
        axios.post('http://localhost:3000/users', user)
         .then(res=>{console.log(res)})
         .catch(err=>{console.log("Error is "+err)})
    
        //console.log(user)
        setUser({
            username: "",
            email: "",
            password: ""
        })
    
      }
    
    function handleEmailInputChange(e){
        setUser({...user, email: e.target.value});
    }

    function handlePasswordInputChange(e){
      setUser({...user, password: e.target.value});
    }

    function handleUsernameInputChange(e){
        setUser({...user, username: e.target.value});
      }


    return(
        <div className="App">
            <header className="App-header">
                
            <h2>Todo</h2>

        <Form onSubmit={handleSubmit}>
                <TextInput
                style={{width: "500px", marginBottom: "10px"}}
                id="test1"
                invalidText="Invalid error message."
                labelText="Username"
                placeholder="Enter username"
                name="username"
                value={user.username}
                onChange={handleUsernameInputChange}
                />

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
                    Register
                </Button>
        </Form>

            </header>
        </div>
    )
}

export default Register;