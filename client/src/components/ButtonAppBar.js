
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Accordion, AccordionDetails, AccordionSummary, Button, Drawer, IconButton, List, ListItem, MenuItem, MenuList, Select } from '@material-ui/core';
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
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuitem: {
    width: 'inherit'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
  nameHeader: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
  }
}));


function ButtonAppBar(props) {
  strings.setLanguage(props.language)
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false)


  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Quiz App
            </Link>
          </Typography>

          {props.isLoggedIn ? <Button variant="contained" color="primary" disableElevation onClick={() => props.logOut()}>{strings.logout}</Button>
            :
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" disableElevation>{strings.login}</Button>
            </Link>
          }
        </Toolbar>
      </AppBar>
      <React.Fragment key="menudrawer">
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <List className={classes.list}>
            <ListItem>
              <Typography className={classes.heading}><b>Quiz App</b></Typography>
            </ListItem>
            {props.isLoggedIn ?
              <div>
                <ListItem className={classes.nameHeader}>
                  {props.user.firstname} {props.user.surname}
                </ListItem>
                <ListItem>
                  <i>{props.user.username}</i>
                </ListItem>
                <ListItem>
                  {props.user.role_id === "2" ?
                    <i>{strings.admin} </i>
                    : <i> {strings.student}</i>
                  }
                </ListItem>
              </div>
              : ""}
            <Accordion>
              <AccordionSummary>
                <Typography className={classes.heading}>{strings.language}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <MenuList className={classes.list}>
                  {/* not translating the language names, feels like it would make it easier for user */}
                  <MenuItem value="en" selected={props.language === "en"} onClick={(e) => props.switchLanguage("en")}> English </MenuItem>
                  <MenuItem value="fi" selected={props.language === "fi"} onClick={(e) => props.switchLanguage("fi")}> Suomi </MenuItem>
                </MenuList>
              </AccordionDetails>
            </Accordion>
            {/* <Select className={classes.lanselect} defaultValue="en" style={{ color: 'black' }} onChange={(e) => props.switchLanguage(e.target.value)}  >
  
              </Select> */}

          </List>
        </Drawer>
      </React.Fragment>


    </div>
  );
}

export default ButtonAppBar
