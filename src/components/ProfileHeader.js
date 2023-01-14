// HomeHeader.js
// Author: J.Purcell    Date: Feb 2022
// Modifier: J. Purcell Last modified: Mar 23, 2022
//
// The ProfileHeader component provides a header bar for, 
// the profile page.
//
// 
// Modification Log:
// Copies the NewsHeader component, and instead has 
// "profile" at the top, instead of "news"

// App imports
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from './AccountMenu';

export default function NewsHeader(){
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return(
    <div>
      <Box sx={{ flexGrow: 1}}>
        <AppBar sx={{width:1}}>
			    <Toolbar sx={{width: 1}}>
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
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
					  - profile -
				  </Typography>
          <AccountMenu />
				  
      </Toolbar>
      </AppBar>
      </Box>


    </div>
  );
}