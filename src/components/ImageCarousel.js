import React from "react";
import { useState } from "react";
import "./ImageCarousel.css";

function ImageCarousel({pictures}) {

    const [currentIndex, setCurrentIndex] = useState(0);

    // console.log(parkToDisplay[0].images[currentIndex].url);

    const handleNext = () => {
        setCurrentIndex(prevIndex => prevIndex + 1 === pictures.length ? 0 : prevIndex + 1);
    }
    
    const handlePrevious = () => {
        setCurrentIndex(prevIndex => prevIndex - 1 < 0 ? pictures.length -1 : prevIndex - 1);
    }

    return (
        <div id="image-carousel">
            {pictures.length < 2 ? null : <span id="prev-button" onClick={handlePrevious}>Prev</span>}
            <figure id="image-details">
                <img id="picture" src={pictures[currentIndex].url} alt={pictures[currentIndex].caption}></img>
                {/* <figcaption>{parkToDisplay[0].images[currentIndex].credit}</figcaption> */}
                <figcaption><sub>{pictures[currentIndex].caption}</sub></figcaption>
            </figure>
            {pictures.length < 2 ? null : <span id="next-button" onClick={handleNext}>Next</span>}
        </div>
    )
}

export default ImageCarousel;