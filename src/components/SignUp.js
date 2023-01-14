// SignUp.js
// Author: S. Sigman    Date: Jan 17, 2022
// Modifier: J. Purcell Date: Feb 16, 2022
//
// The SignUp component provides a signup button and
// dialog that allow new users to creat an account.
// 
// Modification Log:
// 
// when a user signs up, the password is stored as
// a token instead of in clear text. 
//
// the user must enter a password that is 10 characters
// are longer for added security
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextareaAutosize } from '@mui/material';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid'
import FilesUploadComponent from './file';

export default function SignUp() {
    // state of SignUp dialog, setSignUpOpen modifies signUpOpen state
    // default signUpOpen=false
    const [signUpOpen, setSignUpOpen] = React.useState(false); 
    
    // state of passwords
    const [password, setPassword] = React.useState(false);
    const [verifyPassword, setVerifyPassword] = React.useState(false);
    // password error flag
    const [error, setError] = React.useState(false);

    // state of email and email error flag
    const [email, setEmail] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false); 

    // state of names
    const [fName, setFName] = React.useState(false);
    const [fNameError, setFNameError] = React.useState(false)
    const [lName, setLName] = React.useState(false);
    const [lNameError, setLNameError] = React.useState(false)

    //const [profilePict, setProfilePict] = React.useState(false);
    //const [lNameError, setLNameError] = React.useState(false)

    // state of profile
    const [profile, setProfile] = React.useState(false);

    // state indicating whether user is saved or not 
    const [saved, setSaved] = React.useState(false);
    
    // state indicating an account alread exists
    const [duplicate, setDuplicate] = React.useState(false);

    // password isn't good error
    const [badPass, setBadPass]=React.useState(false);

    // function to open the dialog
    const handleClickSignUpOpen = () => {
        setSignUpOpen(true);
      };
    
      // functionm to close the dialog
    const handleSignUpClose = () => {
        setSignUpOpen(false);
        setSaved(false);
        setDuplicate(false);
    };

    // Check of email is valid
    const verifyEmail = (email) => {
        if (email.length >0 ) {
            const re =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            setEmailError(!re.test(String(email).toLowerCase()));
        }
        else 
            setEmailError(false);
    };

    // If password or verify password change

    // If password or verify password change
    React.useEffect(() => {
        checkPassword();
    }, [password, verifyPassword]);

    // Check if passwords match, and is a valid password (>10)
    const checkPassword = () => {
        if (password !== verifyPassword ) {
            setError(true);
        } 
        else if (password.length<10){
            setBadPass(true);
        }
        else {
            setError(false);
            setBadPass(false);
        }
    };


    // Verify a name field is not empty
    const verifyName = (name, surname) => {
        if (name === "") {
           if (surname) {
               setLNameError(true);
           }
           else setFNameError(true)  
        }
        else if (surname) {
            setLNameError(false);
        }
        else {
            setFNameError(false);
        }
    }

    // If the data verifies, them save data
    // using api/createUser.
    const saveAccount = async() => {
        // create profile Data
        const profileData = profile ? profile : "";
        //const profilePict = profilePict ? profilePict: "";
        let profilePict=localStorage.getItem("profilePict2");

        // Create data object to send
        const data = {
            fname: fName,
            lname: lName,
            email: email,
            passWd: password,
            profilePict: profilePict,
            profile: profileData
        }


        // send the data to the server using fetch
        // get passes in the query string
        // post passes in the html body
        const url = "/api/createUser";
        console.log("saving the user");
        /* fetch(url, {
            method: "post",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((res)=> { */
        const res= await fetch(url, {
            method: "post",
            headers: {"Content-Type": "application/json" ,'Accept':'application/json'},
            body: JSON.stringify(data)
        });

        const retData = await res.json();
        console.log(retData);
        console.log(res.status);
            if (res.status === 201) {
            // success - user saved - set state
                setSaved(true);
            }
            else if (res.status === 409) {
                setDuplicate(true);
            }
            else {
                console.log("Database error.")
                console.log(res.status);
            }
            
 
    };
    // Change the first error to not long enough
    return (
        <div>
            <Button color="inherit" onClick={handleClickSignUpOpen}>Sign Up</Button>
            <Dialog open={signUpOpen} onClose={handleSignUpClose}>
                <DialogTitle>
                <Typography variant="title" align="center" >
                    Sign Up
                </Typography>
                </DialogTitle>
                <DialogContent
                    sx={{'& .MuiTextField-root': { mx: 1, width: '47%' }}}
                >
                    {saved ? <Alert onClose={handleSignUpClose}>Account Created</Alert> : null }
                    {duplicate ? 
                                 <Alert severity="error"> An account with that email already exists.</Alert> 
                               : null 
                    }
                    <TextField
                        autoFocus
                        margin="dense"
                        id="fName"
                        label="First Name"
                        type="text"
                        required
                        variant="standard"
                        placeholder="Jane"
                        onChange={(e) => {
                            verifyName(e.target.value, false);
                            setFName(e.target.value);
                        }}
                        helperText={
                            fNameError ? "First name must be entered.": ""
                        }
                        error={fNameError}
                        color={fNameError ? "error" : "success"}
                        focused={fName.length > 0}
                    />
                    <TextField 
                        margin="dense"
                        id="lName"
                        label="Last Name"
                        type="text"
                        required
                        variant="standard"
                        placeholder="Doe"
                        onChange={(e) => {
                            verifyName(e.target.value, true);
                            setLName(e.target.value)
                        }}
                        helperText={
                            lNameError ? "Last Name must be entered.": ""
                        }
                        error={lNameError}
                        color={lNameError ? "error" : "success"}
                        focused={lName.length > 0}
                    />
                </DialogContent>
                <DialogContent sx={{'& .MuiTextField-root': { mx: 1, width: '97%' }}}>
                    <TextField  
                        variant='standard'
                        label='Email'
                        id="email"
                        type='email'
                        placeholder="someone@somewhere.ext"
                        required
                        onChange={(e) => {
                            verifyEmail(e.target.value);
                            setEmail(e.target.value);
                        }} 
                        helperText={
                            emailError
                            ? "Not a valid email address"
                            : "Your email will be your account name."
                        }
                        error={emailError}
                        color={emailError ? "error" : "success"}
                        focused={email.length > 0}
                    />
                </DialogContent>
                {badPass ? <Alert severity="error">Password must be 10 characters or longer</Alert> : null }

                <DialogContent
                    sx={{'& .MuiTextField-root': { mx: 1, width: '47%' }}}
                >
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        required
                        variant="standard"
                        onChange={(e) => setPassword(e.target.value)}
                        error={error}
                        helperText = { error ? "Passwords do not match" : ""}
                        color = {error ? "error" : "success"}
                        focused={password.length > 0}
                    />
                    <TextField 
                        margin="dense"
                        id="password2"
                        label="Retype Password"
                        type="password"
                        required
                        variant="standard"
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        error={error}
                        helperText={error ? "Passwords do not match" : ""}
                        color = {error ? "error" : "success"}
                        focused={verifyPassword.length > 0}
                    />
                
                    <TextareaAutosize
                        minRows={3}
                        placeholder="A bit about me ..."
                        style={{ paddingLeft: '0.5rem', 
                            paddingRight: '0.5rem', 
                            marginTop: '1rem', 
                            width: '96%'
                        }}
                        onChange={(e) => setProfile(e.target.value)}
                    />
                    <Grid item xs={12} md={6}>
			<FilesUploadComponent />

		</Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSignUpClose}>Cancel</Button>
                    <Button 
                        disabled={
                            error || emailError || !password || !verifyPassword || !email || lNameError || fNameError || !lName || !fName 
                        }
                        onClick={saveAccount}>Sign Up</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}