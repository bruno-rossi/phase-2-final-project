import React, {useEffect, useState} from "react";
import ParkCard from "../components/ParkCard";
import { useOutletContext } from "react-router-dom";
import "./Parks.css";

function Parks() {

    const {parks, search, setSearch} = useOutletContext();

    const [searchedParks, setSearchedParks] = useState([parks]);
    
    useEffect(() => {
        setSearchedParks(parks.data.filter(park => park.name.toLowerCase().includes(search.toLowerCase())));
    }, [search])
    
    function handleChange(event) {
        setSearch(event.target.value);
    }
      
    return (
        
        <div>
            <input id="search-input" type="text" placeholder="Search for a park" onChange={handleChange} value={search} />
            <div id="parks-container">
                {searchedParks.map(park => <ParkCard key={park.parkCode} park={park} />)}
            </div>
        </div>
    )
}

export default Parks;