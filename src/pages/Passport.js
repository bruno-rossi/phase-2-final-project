import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Stamp from "../components/Stamp";
import "./Passport.css"

function Passport() {

    const {parks, search, setSearch, stamps} = useOutletContext();

    return (
        <div>
            <h1>Passport page</h1>
            <div id="stamps-container">
                {stamps.map(stamp => <Stamp key={stamp.id} stamp={stamp} />)}
            </div>
        </div>
    )
}

export default Passport;