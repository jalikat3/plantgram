// file.js
// Author: J.Purcell    Date: Feb 2022
// Modifier: J. Purcell Last modified: Mar 23, 2022
//
// The file component uploads profile image to the user.
// Initially, the user has no profile image.
//
// 
// Modifications:
// fixed: finding the right path
// pictures are saved to the images folder
// inside the public directory

import React, { Component } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from 'axios';
export default class FilesUploadComponent extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            profilePict: ''
        }
    }
    onFileChange(e) {
        this.setState({ profilePict: e.target.files[0] })
    }
    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('profilePict', this.state.profilePict)
        console.log("On submit")
        axios.post("http://localhost:3001/api/user-profile", formData, {
        }).then(res => {
            console.log(res)
            localStorage.setItem("profilePict2",res.data.profilePict)
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                <AddAPhotoIcon fontSize="large" />
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">UPLOAD HERE</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}