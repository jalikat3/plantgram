// AccountMenu.js
// Author: J.Purcell    Date: Feb 2022
// Modifier: J. Purcell Last modified: Mar 22, 2022
//
// The NewsHeader component provides a header bar for, 
// the news page.
//
// 
// Modifications:
// added drop down to navigate to the profile page
// added item to navigate back to the news page
// added logout button, that when pressed will clear
// local storage and log out the user

// App imports
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import{useNavigate} from "react-router-dom";
import{useEffect} from 'react';
import { Image, LegendToggle } from '@mui/icons-material';
import FeedIcon from '@mui/icons-material/Feed';



export default function AccountMenu(){

	const navigate=useNavigate();

	const [accountClick, setAccountClick] = React.useState(false);
  const [newsClick, setNewsClick] = React.useState(false);

  const [pageLoad, setPageLoad]=React.useState(false);
	
  // navigate to news
  const handleNewsClick = () => {
    console.log("handle click")
		setAccountClick(true);
		navigate('/news');
	  };
  
  // navigate to profile
	const handleAccountClick = () => {
		setAccountClick(true);
		  navigate('/profile');
	  };


	  const [anchorEl, setAnchorEl] = React.useState(null);

	  const open = Boolean(anchorEl);
    // validate user when they open 
    // profile picture will update (if neccesary)
	  const handleClick = (event) => {
		  setAnchorEl(event.currentTarget);
      validateUser();
	  };
    // will log out user
	  const handleLogOut = () =>{
		  localStorage.clear();
		  navigate('/');
	  }
	
	  const handleClose = () => {
		setAnchorEl(null);
	  };

    useEffect( ()=>{
		
      console.log("You've reached the profile page")
  
      //validateUser();
  
    },[]) 
    const validateUser= async()=>{
      console.log("Getting the token");
      const data={
        token: localStorage.getItem("token")
      }
      console.log("Token received, validating the token");
      if(data.token==null){
        navigate('../')
        
      }
      const path="/api/authToken"
      const res= await fetch(path,{
        method: "get",
        headers:{"Content-Type":"application/json",
             "X-Auth": data.token},
      });
      const retData = await res.json();
      console.log(retData.profilePict);

      console.log(res);
        if(res.status===(200)){
          console.log("user token authenticated");
          localStorage.setItem("profilePict2",retData.profilePict);
          
          setPageLoad(true);
        }
        else if(res.status===401){
          console.log("error");
          navigate('../');
          localStorage.setItem("status", res.status);
        }
        else{
          console.log("Database error.");
          console.log(res.status);
        }
    }
  let pictPath=localStorage.getItem("profilePict2");

  return(
    <div>
      

			<div>
			
			<Tooltip title="Account settings">
			<IconButton
				onClick={handleClick}
				size="small"
				sx={{ ml: 2 }}
				aria-controls={open ? 'account-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
			>
      <Avatar src={pictPath}></Avatar>
			</IconButton>
			</Tooltip>
			</div>
     
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
		<div>
        <MenuItem>
		<ListItemIcon>
            <Settings fontSize="small" />
    </ListItemIcon>
		<IconButton
				onClick={handleAccountClick}
				size="small"
				sx={{ ml: 2 }}
				aria-controls={open ? 'account-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
			>
				Profile Settings
			</IconButton>
        </MenuItem>
		</div>

    <div>
        <MenuItem>
		<ListItemIcon>
            <FeedIcon fontSize="small" />
    </ListItemIcon>
		<IconButton
				onClick={handleNewsClick}
				size="small"
				sx={{ ml: 2 }}
				aria-controls={open ? 'account-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
			>
				News
			</IconButton>
        </MenuItem>
		</div>
        <Divider />
        
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>


    </div>
  );
}