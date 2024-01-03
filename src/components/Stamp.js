import React from "react";
import "./Stamp.css";

function Stamp({stamp}) {
    
    return (
        <div id="stamp" style={{"color": stamp.color, borderColor: stamp.color, borderRadius: stamp.borderRadius, borderStyle: stamp.borderStyle}}>
            <h5 id="stamp-park-name">{stamp.parkName}</h5>
            <h3 id="stamp-date">{stamp.dateVisited}</h3>
        </div>
    )
} 

export default Stamp;