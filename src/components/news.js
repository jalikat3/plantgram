// news.js
// Author: S. Sigman     Date: Jan 1, 2022
// Modifier: J. Purcell	 Last Modified: Feb 16, 2022
// This component alows an individual news page to be built
// for each user of the PlantGram Application. 
//
// Notes:
//	1.	The news page should not be accessable unless a 
//      user is signed in.
//
// Modification Log:
// added components, NewsHeader and NewsFooter, as well
// as a card to simulate a news page.
// 
// console logging to check stages, no sensitive info
// is included in these
//
// navigates the user back to the home page if the
// token does not exist
//
// imports components that can add and display posts

import * as React from 'react';
import Box from '@mui/material/Box';

// Dialog imports
import NewsHeader from './NewsHeader';
import NewsFooter from './NewsFooter';
import Post from './Post';
import GetPost from './RetrievePosts'
import{useNavigate} from "react-router-dom";
import{useEffect} from 'react';
import Grid from '@mui/material/Grid'



function News (){
	const navigate=useNavigate();
	console.log("You've reached the news page")
    const [caption, setCaption] = React.useState('');



	// getting the token when news page is loaded
	useEffect(()=>{
		console.log("page loaded")
		const data={
			token: localStorage.getItem("token")
		}
		console.log(data)
		validateUser();
	}) 

	// accessing response from authToken route
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
		

			if(res.status===(200)){
				console.log("user token authenticated");
				localStorage.setItem("status", res.status);
				console.log(res.json.msg)
				setCaption(localStorage.getItem(caption));
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
	
return (
	<div>
		<NewsHeader />
		<Box sx={{ flexGrow: 1, my: 2}} justifyContent="center">
		<Grid container rowSpacing={2} columnSpacing={{md: 30 }}>
			<Grid item xs={12} md={6}>
					<GetPost />
				</Grid>
				<Grid item xs={12} md={6} justifyContent="left" sx={{minWidth: 300}}>
					<Post />
				</Grid>
			</Grid>		
		</Box>
		
	
		<Box sx={{ flexGrow: 1, my: 2,mx:2}}>
			<NewsFooter />
		</Box>
	</div>)
}

export default News;
