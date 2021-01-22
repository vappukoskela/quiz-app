
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button,  MenuItem, Select } from '@material-ui/core';
import { Link} from "react-router-dom";
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
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Quiz App
            </Link>
          </Typography>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" disableElevation>{strings.login}</Button>
          </Link>
      
          <Select className={classes.lanselect} defaultValue="en" style={{ color: 'white' }} onChange={(e) => props.switchLanguage(e.target.value)}  >
            <MenuItem value="en" selected> EN </MenuItem>
            <MenuItem value="fi"> FI </MenuItem>
          </Select>
        </Toolbar>
      </AppBar>

    </div>
  );
}

export default ButtonAppBar
