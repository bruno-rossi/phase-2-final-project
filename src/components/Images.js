import React from "react";
import { useState } from "react";
import "./Images.css";

function Images({pictures}) {

    const [selectedPicture, setSelectedPicture] = useState(pictures[0]);

    console.log(pictures);

    return (
        <div>
            
            {pictures.length < 1 ? null : <div id="gallery">{pictures.map(picture => <img key={picture.caption} className="picture" src={picture.url} alt={picture.caption} onMouseEnter={() => setSelectedPicture(picture)} />)}</div>}
            <figcaption>{selectedPicture.caption}</figcaption>
            
        </div>
    )
}

export default Images;