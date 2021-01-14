
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, IconButton, MenuItem, Select } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import strings from '../localization/strings';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  lanselect: {
    margin: theme.spacing(1),
    width: "70px",
    paddingInlineStart: '15px'
  }
}));


 function ButtonAppBar(props) {
   console.log(props.language)
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Quiz App
            </Link>
          </Typography>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" disableElevation>{strings.login}</Button>
            </Link>
            {console.log(props, "props")}
            {console.log(strings, "strings")}
            <Select className={classes.lanselect} defaultValue="en" style={{  color: 'white' }} >
              <MenuItem onClick={()=> props.switchLanguage('en')} value="en" selected> EN </MenuItem>
              <MenuItem onClick={()=> props.switchLanguage('fi')} value="fi"> FI </MenuItem>
            </Select>
        </Toolbar>
      </AppBar>

    </div>
  );
}

export default ButtonAppBar
