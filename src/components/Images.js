import React from "react";
import { useState } from "react";
import "./Images.css";

function Images({pictures}) {

    console.log(pictures);

    return (
        <div>
            {pictures.length < 1 ? null : <div id="gallery">{pictures.map(picture => <img key={picture.caption} className="picture" src={picture.url} alt={picture.caption} />)}</div>}
        </div>
    )
}

export default Images;