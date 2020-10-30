import React from 'react';
import '../config.js';

// The backend port comes from the config.js
const backendURL = global.config.backend;

export default function Image(props) {
    
    // Like divStyle, I've put this code in the App.css until I want to dynamically change the css 
    // const imgStyle = {
    //     width: '50vw',
    //     maxWidth: '600px',
    //     objectFit: 'contain',
    // }

    return (
        <>
            <img src={`${backendURL}/${props.imageURL}`} className="split_image" alt={"alt_placeholder"}/>
        </>
    )
    
}
