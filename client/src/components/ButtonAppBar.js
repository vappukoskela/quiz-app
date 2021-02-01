
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, IconButton, MenuItem, Select } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { Link } from "react-router-dom";
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
  strings.setLanguage(props.language)
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Quiz App
            </Link>
          </Typography>
          <Select className={classes.lanselect} defaultValue="en" style={{ color: 'white' }} onChange={(e) => props.switchLanguage(e.target.value)}  >
            <MenuItem value="en" selected> EN </MenuItem>
            <MenuItem value="fi"> FI </MenuItem>
          </Select>
          {props.isLoggedIn ? <Button variant="contained" color="primary" disableElevation onClick={() => props.logOut()}>{strings.logout}</Button>
            :
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" disableElevation>{strings.login}</Button>
            </Link>
          }
        </Toolbar>
      </AppBar>

    </div>
  );
}

export default ButtonAppBar
