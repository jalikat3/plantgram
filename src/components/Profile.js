// Profile.js
// Author: J. Purcell    Date: Feb, 2022
// Modifier: J. Purcell	 Last Modified: Mar 22, 2022
// This component alows an individual news page to be built
// for each user of the PlantGram Application. 
//
// Notes:
//	1.	The profile page should not be accessable unless a 
//      user is signed in.
//
// Modification Log:
// added components, profile header and footer
// 
// checks to make sure the user is signed in
// 
// includes information about the user, as well as a form
// to submit for editing the users' info
// file component added for photo submission

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';



// Dialog imports
import ProfileHeader from './ProfileHeader';
import NewsFooter from './NewsFooter';
import{useNavigate} from "react-router-dom";
import{useEffect} from 'react';


import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import { useRef } from 'react';


import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/material';
import FilesUploadComponent from './file';



function Profile (){
	const navigate=useNavigate();

	// these must be set as strings, as to not update the account info
	// card with every keypress
	const myEString=localStorage.getItem("email")
	let myFString=localStorage.getItem("fname")
	let myLString=localStorage.getItem("lname")
	let myBio=localStorage.getItem("profile")

	const nameForm = useRef(null);

	const [fname, setFName] = React.useState('');
	const [updated, setUpdated] = React.useState(false);
	const [lname, setLName] = React.useState('');
	const [profile, setProfile] = React.useState('');
	const [pageload, setPageLoad]=React.useState(false);
	const [fNameError, setFNameError] = React.useState(false);	
	const [lNameError, setLNameError] = React.useState(false)



	// getting the token when profile page is loaded
	useEffect( ()=>{
		console.log("You've reached the profile page")
		setFName(localStorage.getItem("fname"));
		setLName(localStorage.getItem("lname"));
		setProfile(localStorage.getItem("profile"));
		validateUser();

	},[]) 
	// on change: get the most updated data
	const data={
		token: localStorage.getItem("token"),
		email: localStorage.getItem("email"),
		fname: localStorage.getItem("fname"),
		lname: localStorage.getItem("lname")
	}



	
	// validate user is called to make sure the user has valid token 
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

		console.log(res);
		const retData = await res.json();
		console.log(retData);

			if(res.status===(200)){
				console.log("user token authenticated");
				localStorage.setItem("fname",retData.fname);
				localStorage.setItem("lname",retData.lname);
				localStorage.setItem("profile", retData.profile);
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
	
	// handle change will be called when submit is pressed
	const handleChange = async() => {
		console.log("Edit request")
		const token=localStorage.getItem("token")
		const email=localStorage.getItem("email")

		// get the most update profilePict location
		const profilePict= localStorage.getItem("profilePict");
		
		const data={
			email: email,
			fname: fname,
            lname: lname,
            profilePict: localStorage.getItem("profilePict2"),
			profile: profile
        }
		console.log(data);
		const url = "/api/editUser";
		const res= await fetch(url,{
			method: "put",
			headers:{"Content-Type":"application/json",
						"X-Auth": token},
			body: JSON.stringify(data)
		});
		console.log("Response status "+res.status);
    
            if (res.status === 200) {
            // success - user saved - set state
				console.log("Updates saved")
				console.log("Response"+ res)
			
				// only store if changes were made 
				if(fname){
					localStorage.setItem("fname",fname);
					setFName(fname);
				}
				if(lname!=""){
					console.log(res.lname);
					localStorage.setItem("lname",lname);
					setLName(lname);
				}
				if(profile!=""){
					localStorage.setItem("profile", profile);
					setProfile(profile);
				}
    			const profilePict= localStorage.getItem("profilePict2");

				// call validate user to update information displayed
				// on card without having to reload
				//validateUser();
				setUpdated(true);
            }
            else if (res.status === 401) {
                console.log("error")
            }
            else {
                console.log("Database error.")
                console.log(res.status);
            }
		}
		// get the path for profilePict
		let profilePict=localStorage.getItem("profilePict2");
	
return (
	<div>
		<ProfileHeader />
		
		<Box sx={{ flexGrow: 1, my: 2, mx: 2 }}>
		<Grid container rowSpacing={2} columnSpacing={{md: 2 }}>
				<Grid item xs={12} md={6}>
					<Card sx={{ flexGrow: 1, my: 10 }}>
					<CardHeader title="Account Info" subheader="reload may be neccesary to see changes"/>
						
						<CardContent>
						<p className="card-text">{"Email: "+myEString}</p>
						<p className="card-text">{"First Name: "+myFString}</p>
						<p className="card-text">{"Last Name: "+myLString}</p>
						<p className="card-text">{"Bio: "+myBio}</p>
						<CardMedia component="img" sx={{width: 1/2 ,height: 1/2}} image={profilePict}></CardMedia>
				</CardContent> 
				</Card>
				</Grid>

				<Grid item xs={12} md={6}>

		

		<Card sx={{ flexGrow: 1, my: 10 }}>
		
		<CardHeader title="Update Account" subheader="click to edit" />
        
          
		<FormControl ref={nameForm} variant="standard">
		<Grid container rowSpacing={2} columnSpacing={{md: 2 }}>
				<Grid item xs={12} md={6}>
        		<TextField
                autoFocus
                margin="dense"
				label="First Name"
                id="userFName"
                variant="outlined"
				onChange={(e)=>{
					setFName(e.target.value)
				  }}
                />
				
				</Grid>
				<Grid item xs={12} md={6}>
		<TextField
                autoFocus
                margin="dense"
				label="Last Name"
                id="userLName"
                variant="outlined"
                onChange={(e)=>{
                  setLName(e.target.value)
				}}
			
        />
		
		</Grid>
		<Grid item xs={12} md={6}>
		<TextareaAutosize
                        minRows={3}
                        placeholder="A bit about me ..."
                        style={{ paddingLeft: '0.5rem', 
                            paddingRight: '0.5rem', 
                            marginTop: '1rem', 
                            width: '96%'
                        }}
						onChange={(e)=>{
							setProfile(e.target.value)
				  		}}
                        
                    />
		</Grid>
		<Grid item xs={12} md={6}>
			<FilesUploadComponent />

		</Grid>
		</Grid>
			  
      	</FormControl>
		  <Button onClick={handleChange}>submit</Button>
		</Card>

		</Grid>
		</Grid>
		</Box>
		<NewsFooter />
	
		
	</div>)
}

export default Profile;
