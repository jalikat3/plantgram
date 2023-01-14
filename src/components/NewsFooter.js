// Footer.js
// Author: J. Purcell  Date: Jan 2022
//                      Last modified: Feb 16, 2022
//
// This component provides a simple footer component 
// for the news page.
// 
// Modification Log: 
//
// corrected date
//
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function NewsFooter() {
    return (
        <AppBar position="absolute" color="primary"
        sx={{
            flexGrow: 1,
            my: 100
            
        }} >
            <Toolbar >
                <Typography 
                    variant="body1" 
                    color="inherit" 
                    align="center" 
                    component='div'
                >
                    © 2022 J. Purcell
                </Typography>
            </Toolbar>
        </AppBar>
    )
}