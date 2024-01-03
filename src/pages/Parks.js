import ParkCard from "../components/ParkCard";
import { useOutletContext } from "react-router-dom";
import "./Parks.css";

function Parks() {

    const {parks, search, setSearch} = useOutletContext();

    const searchedParks = parks.data.filter(park => park.name.toLowerCase().includes(search.toLowerCase()));

    function handleChange(event) {
        setSearch(event.target.value);
      }

    return (
        
        <div>
            <input id="search-input" type="text" placeholder="Search for a park" onChange={handleChange} value={search} />
            <div id="parks-container">
                {searchedParks.map(park => <ParkCard key={park.id} park={park} />)}
            </div>
        </div>
    )
}

export default Parks;