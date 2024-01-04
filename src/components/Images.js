import React from "react";
import { useState } from "react";
import "./Images.css";

function Images({pictures}) {

    // const [currentIndex, setCurrentIndex] = useState(0);

    // console.log(parkToDisplay[0].images[currentIndex].url);

    // const handleNext = () => {
    //     setCurrentIndex(prevIndex => prevIndex + 1 === pictures.length ? 0 : prevIndex + 1);
    // }
    
    // const handlePrevious = () => {
    //     setCurrentIndex(prevIndex => prevIndex - 1 < 0 ? pictures.length -1 : prevIndex - 1);
    // }

    console.log(pictures);

    return (
        <div>
            {/* {pictures.length < 2 ? null : <span id="prev-button" onClick={handlePrevious}>Prev</span>}
            <figure id="image-details">
                <img id="picture" src={pictures[currentIndex].url} alt={pictures[currentIndex].caption}></img> */}
                {/* <figcaption>{parkToDisplay[0].images[currentIndex].credit}</figcaption> */}
                {/* <figcaption><sub>{pictures[currentIndex].caption}</sub></figcaption>
            </figure>
            {pictures.length < 2 ? null : <span id="next-button" onClick={handleNext}>Next</span>} */}
            {pictures.length < 1 ? null : <div id="gallery">{pictures.map(picture => <img key={picture.caption} className="picture" src={picture.url} alt={picture.caption} />)}</div>}
        </div>
    )
}

export default Images;