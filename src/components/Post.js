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
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextareaAutosize } from '@mui/material';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid'
import FilesUploadComponent2 from './postFile';
import Box from '@mui/material/Box';


export default function Post() {


    // state of profile
    const [caption, setCaption] = React.useState('');

    // state indicating whether user is saved or not 
    const [saved, setSaved] = React.useState(false);
    const [alert, setAlert]=React.useState(false);
    const [imageA, setImageA]=React.useState(false);
    const handleAlertClose = () => {
        setSaved(false);
    };
    const handleAlert2Close = () => {
        setAlert(false);
    };


    // save post they insert
    const savePost=async()=>{
        const captionData=caption;
        if(captionData){
        let picture=localStorage.getItem("currentPost")
        localStorage.setItem("caption",captionData)

        const data={
            email: localStorage.getItem("email"),
            picture: localStorage.getItem("currentPost"),
            caption: captionData
        }
        console.log("This is my data"+data.email+data.picture+data.caption);

        const url = "/api/addPosts";
        console.log("saving the post");
        console.log("url");

        const res= await fetch(url, {
            method: "post",
            headers: {"Content-Type": "application/json" ,'Accept':'application/json'},
            body: JSON.stringify(data)
        });
    
        console.log(res);

        const retData = await res.json();
        console.log(retData);
        console.log(res.status);
            if (res.status === 201) {
            // success - user saved - set state
                setSaved(true);

                localStorage.setItem("picture2",data.picture);
                localStorage.setItem("caption",data.caption);

            }
            else if (res.status === 400) {
                setSaved(false);
            }
            else {
                console.log("Database error.")
                console.log(res.status);
            }
        }
        else{
            setAlert(true);
        }
    }
    
    return (
        <div>
                <Box sx={{my: 2}}>
                <Grid container justifyContent="center">
                <Grid sx={{my: 20, backgroundColor: 'green'}}>
                    
                <DialogTitle>
                <Typography variant="title" align="center" color="white" >
                    Create a New Post
                </Typography>
                </DialogTitle>
                <DialogContent
                    sx={{'& .MuiTextField-root': { mx: 1, width: '47%', backgroundColor: 'green'}}}

                >{saved ? <Alert onClose={handleAlertClose}>Post Created</Alert> : null }
                {alert ? <Alert severity="error" onClose={handleAlert2Close}>Please add a caption.</Alert> : null }
                    
                    
                   
                
                
                    <FilesUploadComponent2 />
                    <TextareaAutosize
                        minRows={3}
                        id="caption"
                        placeholder="Add your caption here..."
                        style={{ paddingLeft: '0.5rem', 
                            paddingRight: '0.5rem', 
                            marginTop: '1rem', 
                            width: '96%',
                        }}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                    <Grid item xs={12} md={6}>
			

		</Grid>
                </DialogContent>
                <DialogActions>
                    <Button sx={{color:"white"}}>Cancel</Button>
                    <Button sx={{color:"white"}}
                        // disabled={
                        //     error || emailError || !password || !verifyPassword || !email || lNameError || fNameError || !lName || !fName 
                        // }
                        onClick={savePost}>Save</Button>
                </DialogActions>
                </Grid>


                
        </Grid>
        </Box>
            
        </div>
    );
}