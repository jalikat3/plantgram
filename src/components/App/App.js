// App.js
// Date: Jan 1, 2022 
// This component is the main component of a Reactjs project.
// It's main resposibility is to route calls for a page to the
// correct page component.  
//
// Notes:
//  1. A Reactjs project is auto-generated using the script:
//               create-react-app
//     The App.js object is created as a part of generating the
//     project.
//  2. Theming Color Palet Link: https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=43A047&secondary.color=6D4C41&primary.text.color=E6EE9C&secondary.text.color=ffffff
//
// Modification Log:
//  1. React routing tutorial conversion to PlantGram starter code started.
//     S. Sigman, Jan 7, 2022
//  2. Theming added.  Jan 11, 2022

import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom';
import Home from '../home';
import About from '../about';
import News from '../news';
import Profile from '../Profile';
import './App.css';

// Theme imports
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const theme = createTheme({
  palette: {
    primary: {
      light: '#76d275',
      main: '#43a047',
      dark: '#00701a',
      contrastText: '#fffde7'
    },
    secondary: {
      light: '#9c786c',
      main: '#6d4c41',
      dark: '#40241a',
      contrastText: '#ffffff',
    }
  }
})

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ 
          bgcolor: '#fff8e1', 
          display: 'flex', 
          flexGrow: 1,
          height: '100vh' }}
        >
        <CssBaseline />
        <Router>
          <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route exact path='/about' element={< About />}></Route>
            <Route exact path='/news' element={< News />}></Route>
            <Route exact path='/profile' element={<Profile />}></Route>
          </Routes>

        </Router>
        </Box>
      </ThemeProvider>
  );
  }
}

export default App;
