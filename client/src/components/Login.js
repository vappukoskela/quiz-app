import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Button, TextField } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import axios from 'axios'
import strings from '../localization/strings';

const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const changeData = (e, field) => {
        setUserData({ ...userData, [field]: e.target.value })
    }

    const submitLogin = async (e) => {
        console.log(userData)
        let body = {
            email: userData.email,
            password: userData.password,
        }
        console.log(body)
        e.preventDefault()
        // try {
        //      await axios.post("http://localhost:5000/register/", body).then(response => {
        //         setErrorMsg("");})
        
        // } catch (e) {
        //     setErrorMsg("Registration failed")
        //     console.log("registration error", e)
        // }
    }
// localstorage jwtToken tallenna userid rooli
    return (
        <div className="container">
            <List>
                <ListItem>
                    <h2>{strings.login}</h2>
                </ListItem>
                <ListItem>
                    <TextField onChange={(event) => changeData(event, "email")} size="small" label="Email" variant="outlined"></TextField>
                </ListItem>
                <ListItem>
                    <TextField onChange={(event) => changeData(event, "password")} size="small" label="Password" type="password" variant="outlined"></TextField>
                </ListItem>
                <ListItem>
                    <Button variant="outlined">Login</Button>
                </ListItem>
                <ListItem>
                        <Link to="/register"><i>Register here</i></Link>
                </ListItem>
            </List>
        </div>
    )
};
export default Login