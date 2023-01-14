// HomeHeader.js
// Author: S. Sigman    Date: Jan 7, 2022
// Modifier: J. Purcell Last Modified: 
// The HomeHeader component provides a header bar for, 
// the home (landing) page, providing sign in and 
// sign up dialogs. 
// 
// Modification Log:
// 1. SignUp button and dialog refactored into a new
//    component, <SignUp />. S. Sigman Jan 17, 2022
//
// 

// App imports
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


import SignUp from './SignUp';
import SignIn from './SignIn';

export default function HomeHeader() {

  
  return (
    <Box sx={{ flexGrow: 1, pb: 10}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            PlantGram
          </Typography>
           
        <SignIn />
        <SignUp />
        </Toolbar>
      </AppBar>
    </Box>
  );
}