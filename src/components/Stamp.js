import React from "react";
import "./Stamp.css";

function Stamp({stamp}) {
    
    return (
        <div id="stamp">
            <h5 id="stamp-park-name">{stamp.parkName}</h5>
            <h3 id="stamp-date">{stamp.dateVisited}</h3>
        </div>
    )
} 

export default Stamp;