// SignIn.js
// Author: J. Purcell    Date: Jan 2022
// Modifier: J. Purcell Last Modified: Feb 11, 2022
//
// The sign in component contains the gui for signing
// in to access the newspage. When the user signs in 
// with the correct username and password, they will
// be redirected. An alert will show if the user 
// enters incorrect information.

//
// Modification Log:
// 1. SignUp button and dialog refactored into a new
//    component, <SignUp />. S. Sigman Jan 17, 2022
//
// when user signs in, the auth route is called
// set items to local storage to use later on in
// the profile page
// 

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import{useNavigate} from "react-router-dom";


export default function SignIn() {
  const navigate=useNavigate();
  // default signInOpen=false
  const [signInOpen, setSignInOpen] = React.useState(false);
  //const [password, setPassword] = React.useState(false);
  const [userId, setUserId]=React.useState(false);

  const[userIdError,setUserIdError]=React.useState(false);

  const [password,setPassword]=React.useState(false);
  const [passwordError,setPasswordError]=React.useState(false);

  const [authed, setAuthed] = React.useState(false);


  // methods to manipulate the SignIn dialog
  const handleClickSignInOpen = () => {
    setSignInOpen(true);
    setAuthed(true);
  };

  const handleSignInClose = () => {
    setSignInOpen(false);
  };

  // only changes state of the error
  const checkUserId=(userId)=>{
    if(userId===""||userId===null||userId===" "){
      setUserIdError(true);
    }
    else {
        setUserIdError(false);
    }
  }

  const authUser= async()=>{
    const data={
      email: userId,
      password: password
    }
    
    console.log("authorizing user...")

    const url = "/api/signin";
    const res= await fetch(url, {
      method: "post",
      headers: {"Content-Type": "application/json" ,
      'Accept':'application/json'},
      body: JSON.stringify(data),
      
    });
        const status=res.status;
        const retData = await res.json();

          if (status === 200) {
            // success - user saved - set state
                setAuthed(true);
                console.log("user found");

                // how to store in local storage
                localStorage.setItem("token", retData.token);
                localStorage.setItem("email",retData.email);
                localStorage.setItem("fname",retData.fname);
                localStorage.setItem("lname",retData.lname);
                console.log(retData.profile);
                localStorage.setItem("profile",retData.profile);
                localStorage.setItem("profilePict2",retData.profilePict);

                navigate('/news');
                
            }
            else if (status === 401) {
                setAuthed(false);
    
                console.log("user not found")
            }
            else {
                console.log("Database error.")
            }
          }

  return (
    <div>
          <Button color="inherit" onClick={handleClickSignInOpen}>Sign In</Button>
          <Dialog open={signInOpen} onClose={handleSignInClose}>
            <DialogTitle>
              <Typography align="center" >
                Sign In
              </Typography>
            </DialogTitle>
            <DialogContent dividers={true}>
            {authed ? null: <Alert severity="error"> Error: wrong username or password.</Alert> }
              <TextField
                autoFocus
                margin="dense"
                id="userId"
                label="User Id"
                type="email"
                required
                variant="outlined"
                onChange={(e)=>{
                  checkUserId(e.target.value);
                  setUserId(e.target.value)
                }}
                helperText={
                  userIdError ? "An email must be entered": ""
                }
                error={userIdError}
                color={userIdError ? "error":"success"}
                focused={userId.length>0}
              />
              <TextField 
              sx={{mx:1}}
              margin="dense"
              id="password"
              label="Password"
              type="password"
              required
              variant="outlined"
              onChange={(e)=>setPassword(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSignInClose}>Cancel</Button>
              <Button disabled={
                userIdError||passwordError||!userId||!password
              }
               onClick={authUser}>Sign In</Button>
            </DialogActions>
          </Dialog>
          
        
    </div>

  );
}
