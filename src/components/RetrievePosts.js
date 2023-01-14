// RetrievePost.js
//
// The component that gets and displays the posts 
// from the post table

import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


export default function GetPost() {

    const [saved, setSaved] = React.useState(false);

    const [caption,setCaption]=React.useState('no posts yet');
    const [picture,setPicture]=React.useState('/images/empty.jpeg');

   const [images,setImages]=React.useState([]);
   const [captions,setCaptions]=React.useState([]);



    const getPost=async()=>{
        const uemail=localStorage.getItem("email");

        const data={
            email: uemail
        }
        console.log("This is my data"+data.email);

        const url = "/api/retrievePosts";
        console.log("gettings the posts");
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
            if (res.status === 200) {
            // success - posts retrieved - set state
                setSaved(true);
                console.log(retData.pictures_array)
                console.log(retData.captions_array)
                console.log("caption picture"+retData.post_caption);
                setPicture(retData.post_picture);
                setCaption(retData.post_caption);
                setImages(retData.pictures_array);
                setCaptions(retData.captions_array)
                
                localStorage.setItem("post picture",retData.post_picture)
                localStorage.setItem("caption picture", retData.post_caption)
            }
            else if (res.status === 400) {
                setSaved(false);
            }

            else {
                console.log("Database error.")
                console.log(res.status);
            }
    }
    
    return (
        <div>
 
                <Card sx={{maxHeight: 800, minWidth:500, my: 10, mx:5, flexWrap: 'wrap'}}>
                <DialogActions sx={{minWidth: 50}}>
                    <Button sx={{color:"green"}} onClick={getPost}>refresh posts</Button>
                </DialogActions>
            <CardHeader title="posts"/>
            <CardContent>
                        <p className="card-text">{caption}</p>
 						<CardMedia component="img" sx={{width: 1/2,height: 1/2}} image={picture}></CardMedia>
            						
                        <div>
                            <p>recently posted</p>
                {images.map((img, i) => {
                    return <img className="preview" padding="10" border="10" mx="10" width="100" height="100" src={img} alt={"image-" + i}  key={i}/>;
                })}
                </div>
                </CardContent>
            </Card>         
            
        </div>
    );
}