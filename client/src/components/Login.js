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
    const changeData = (e, field) => {
        setUserData({ ...userData, [field]: e.target.value })
    }
    const loggingIn = () => {
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