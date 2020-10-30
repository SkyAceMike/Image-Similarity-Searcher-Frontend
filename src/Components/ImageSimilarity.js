import React, { useState, useEffect } from 'react';
import Image from './Image.js';
import ImageInfo from './ImageInfo.js';
import ImageControls from './ImageControls.js';
import '../config.js';

export default function ImageSimilarity() {

    // --- Status check on fetch API to backend ---
    const [isLoaded, setIsLoaded] = useState(false);
    // const [error, setError] = useState(null);

    // --- Image Names and Dimensions ---
    const [images, setImages] = useState([]);
    const [imageInfo, setImageInfo] = useState([]);

    // --- Current Pair and Index of images ---
    const [imagePairIndex, setImagePairIndex] = useState(0);
    const [imagePair, setImagePair] = useState([]);
    
    // Get data from backend. Only runs once
    const getImages = async () => {
        // The backend port comes from the config.js
        const response = await fetch(`${global.config.backend}/images/similar`);
        const data = await response.json();
        // Get Image Names and Dimensions
        setImages(data.images);
        setImageInfo(data.info);
        // Ready to render
        setIsLoaded(true);
    }

    // Marks an image for manual deletion
    const delete_image = async (imageName) => {
        try {
            const response = await fetch(`${global.config.backend}/images/${imageName}`, {
                method: 'delete'
            });
            console.log("DELETE req: ", response);

            // Renove all image pairs that include the image that was just deleted
            setImages(images.filter((imagePair) => !imagePair.some((image) => image === imageName)));
        }
        catch (err) {
            console.log(err);
        }
    };

    // Increments image pair index when the Next Pair button is pressed
    const increment = () => {
        setImagePairIndex(prev => prev + 1);
    }

    // Decrements image pair index when the Next Pair button is pressed
    const decrement = () => {
        setImagePairIndex(prev => prev - 1);
    }

    // Gets the next pair of images when the image pair index is changed
    useEffect(() => {
        setImagePair(images[imagePairIndex]);
    }, [images, imagePairIndex]);

    // This is an "On Mount" Function
    useEffect(() => {
        getImages();
    }, []);

    // This is the inline CSS syntax you can use in React, but I've put this divStyle styling in the App.css 
    // const divStyle = {
    //     display: 'flex',
    //     justifyContent: 'space-around',
    // }

    // Show the loading screen until the fetch from backend finishes
    if (isLoaded) {
        if (imagePairIndex === images.length || imagePairIndex < 0) {
            // TODO in next version: Handle/prevent index of Image Pairs out of bounds event
            return <div>Image Pair number out of bounds. Refresh the page</div>;
        } else {
            return (
                <div>
                    <div id="image_container" className="split_div">
                        <Image imageURL={imagePair[0]}></Image>
                        <Image imageURL={imagePair[1]}></Image>
                    </div>
                    <div id="image_info_container" className="split_div">
                        <ImageInfo name={imagePair[0]} info={imageInfo[imagePair[0]]}></ImageInfo>
                        <ImageInfo name={imagePair[1]} info={imageInfo[imagePair[1]]}></ImageInfo>
                    </div>
                    <div id="image_control_container" className="split_div">
                        <ImageControls name={imagePair[0]} deleteImage={delete_image}></ImageControls>
                        <ImageControls name={imagePair[1]} deleteImage={delete_image}></ImageControls>
                    </div>
                    <div id="image_navigation_container">
                        <center>Image pair: {imagePairIndex + 1}/{images.length}</center>
                        <button id='image_next_pair' onClick={increment}>Next Pair</button>
                        <button id='image_prev_pair' onClick={decrement}>Prev Pair</button>
                    </div>
                </div>
            );
        }
    } else {
        // Loading Screen
        return <div>Loading...</div>;
    }
}
