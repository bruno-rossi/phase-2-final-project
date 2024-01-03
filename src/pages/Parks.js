import React, {useEffect, useState} from "react";
import ParkCard from "../components/ParkCard";
import { useOutletContext } from "react-router-dom";
// import useInfiniteScroll from 'react-infinite-scroll-hook';
import "./Parks.css";

function Parks() {

    const {parks, search, setSearch} = useOutletContext();

    const [searchedParks, setSearchedParks] = useState([parks]);
    // const [parksToDisplay, setParksToDisplay] = useState([parks]);
    // const [currentPage, setCurrentPage] = useState(0);
    
    useEffect(() => {
        setSearchedParks(parks.data.filter(park => park.name.toLowerCase().includes(search.toLowerCase())));
    }, [search])

    // useEffect(() => {
    //     for (let i = currentPage; i <= (currentPage + 6); i++) {
    //         setParksToDisplay(prevValue => [...prevValue, searchedParks[i]]) 
    //         console.log(searchedParks[i]);
    //     }
    // }, [currentPage]);

    // function paginate() {
    //     setCurrentPage(prevValue => prevValue + 6);
    //     console.log(currentPage);
    // }
    
    function handleChange(event) {
        setSearch(event.target.value);
    }
      
    return (
        
        <div>
            <input id="search-input" type="text" placeholder="Search for a park" onChange={handleChange} value={search} />
            <div id="parks-container">
                {searchedParks.map(park => <ParkCard key={park.id} park={park} />)}
            </div>
            {/* <div onClick={() => {paginate()}}>Load more...</div> */}
        </div>
    )
}

export default Parks;