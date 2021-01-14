import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Button, Checkbox, TextField } from '@material-ui/core';
import axios from 'axios';
import strings from '../localization/strings';

const Register = () => {
    const [userData, setUserData] = useState({
        firstname: '',
        surname: '',
        email: '',
        password: '',
        role_id: 2
    })
    const [isAdmin, setIsAdmin] = useState(true)

    const [errorMsg, setErrorMsg] = useState("")

    const changeData = (e, field) => {
        setUserData({...userData, [field]: e.target.value})
    }  
    
    useEffect(() => {
        if (isAdmin) {
            setUserData({...userData, "role_id": 2}) // roleid 2: teacher
        } else {
            setUserData({...userData, "role_id": 3}) // roleid 3: student
        }
    },[isAdmin, userData])


    const submitRegistration = async (e) => {
        console.log(userData)
        let body = {
            email: userData.email,
            password: userData.password,
            firstname: userData.firstname,
            surname: userData.surname,
            role_id: userData.role_id
        }
        console.log(body)
        e.preventDefault()
        try {
             await axios.post("http://localhost:5000/register/", body).then(response => {
                setErrorMsg("");})
        
        } catch (e) {
            setErrorMsg(strings.regerror)
            console.log("registration error", e)
        }
    }

    return (
        <div className="container">
            <List>
                <ListItem>
                    <h2>{strings.register}</h2>
                </ListItem>
                <ListItem>
                    <TextField onChange={(event) => changeData(event, "firstname")} size="small" label={strings.firstname} variant="outlined"></TextField>
                </ListItem>
                <ListItem>
                    <TextField onChange={(event) => changeData(event, "surname")} size="small" label={strings.surname} variant="outlined"></TextField>
                </ListItem>
                <ListItem>
                    <TextField onChange={(event) => changeData(event, "email")} size="small" label={strings.email} variant="outlined"></TextField>
                </ListItem>
                <ListItem>
                    <TextField onChange={(event) => changeData(event, "password")} size="small" label={strings.password} type="password" variant="outlined"></TextField>
                </ListItem>
                <ListItem><Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(!isAdmin)}/> {strings.adminuser}?</ListItem>
                <ListItem>
                    <Button variant="outlined" onClick={(e) => submitRegistration(e)}>{strings.register}</Button>
                </ListItem>
                <ListItem className="errorMessage">{errorMsg}</ListItem>
            </List>
        </div >
    )
};

export default Register;