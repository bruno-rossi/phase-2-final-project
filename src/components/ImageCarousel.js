import React from "react";
import { useState } from "react";
import "./ImageCarousel.css";

function ImageCarousel({parkToDisplay}) {

    const [currentIndex, setCurrentIndex] = useState(0);

    console.log(parkToDisplay[0].images[currentIndex].url);

    const handleNext = () => {
        setCurrentIndex(prevIndex => prevIndex + 1 === parkToDisplay[0].images.length ? 0 : prevIndex +1);
    }
    
    const handlePrevious = () => {
        setCurrentIndex(prevIndex => prevIndex - 1 < 0 ? parkToDisplay[0].images.length -1 : prevIndex -1);
    }

    return (
        <div id="image-carousel">
            <span id="prev-button" onClick={handlePrevious}>Prev</span>
            <figure id="image-details">
                <img src={parkToDisplay[0].images[currentIndex].url} alt={parkToDisplay[0].images[currentIndex].altText}></img>
                {/* <figcaption>{parkToDisplay[0].images[currentIndex].credit}</figcaption> */}
                <figcaption><sub>{parkToDisplay[0].images[currentIndex].caption}</sub></figcaption>
            </figure>
            <span id="next-button" onClick={handleNext}>Next</span>
        </div>
    )
}

export default ImageCarousel;