import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Button, TextField } from '@material-ui/core';
import {
    Link, Redirect
} from "react-router-dom";
import axios from 'axios'
import strings from '../localization/strings';

const Login = (props) => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const changeData = (e, field) => {
        setUserData({ ...userData, [field]: e.target.value })
    }

    // const submitLogin = async (e) => {
    //     console.log(userData)
    //     let body = {
    //         email: userData.email,
    //         password: userData.password,
    //     }
    //     console.log(body)
    //     e.preventDefault()
    //     try {
    //         await axios.post("http://localhost:5000/login/", body).then(response => {
    //             console.log(response, "LOGIN RESPONSE")
    //             localStorage.setItem('jwtToken', response.data.token)
    //             setIsLoggedIn(true)
    //         })
    //     } catch (e) {
    //         console.log("registration error", e)
    //     }
    // }

    const loggingIn = () => {
        console.log(userData)
        // setIsLoggedIn(true)       
        props.submitLogin(userData)
    }

    // localstorage jwtToken tallenna userid rooli
    return (
        <div className="container">
            {/* {props.isLoggedIn ? <Redirect to= "/"/> :  */}
            <List>
                <ListItem>
                    <h2>{strings.login}</h2>
                </ListItem>
                <ListItem>
                    <TextField onChange={(event) => changeData(event, "email")} size="small" label={strings.email} variant="outlined"></TextField>
                </ListItem>
                <ListItem>
                    <TextField onChange={(event) => changeData(event, "password")} size="small" label={strings.password} type="password" variant="outlined"></TextField>
                </ListItem>
                <ListItem>
                    <Button variant="outlined" onClick={loggingIn}>{strings.login}</Button>
                </ListItem>
                <ListItem>
                    <Link to="/register"><i>{strings.reglink}</i></Link>
                </ListItem>
            </List>
            {/* } */}
        </div>
    )
};
export default Login