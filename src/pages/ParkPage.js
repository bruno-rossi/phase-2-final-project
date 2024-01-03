import React, { useState, useEffect } from "react";
import ImageCarousel from "../components/ImageCarousel";
import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./ParkPage.css";

function ParkPage() {

    const params = useParams();
    console.log(params);
    const {parks, search, setSearch, stamps, setStamps} = useOutletContext();

    const [isVisited, setIsVisited] = useState(false);

    const parkToDisplay = parks.data.filter(park => park.parkCode === params.parkCode);
    console.log(stamps);

    useEffect(() => {
        setIsVisited(stamps.some(stamp => stamp.parkCode === params.parkCode));
    }, [])

    // const featuredImage = parkToDisplay[0].images.length !== 0 ? <img id="featured-image" src={parkToDisplay[0].images[0].url} alt={parkToDisplay[0].images[0].altText} /> : null;

    const activities = parkToDisplay[0].activities.map(activity => <li key={activity.id}>{activity.name}</li>)

    function handleSubmit(event) {
        event.preventDefault();

        setIsVisited(prevValue => !prevValue);

        fetch("http://localhost:8000/stamps", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "parkName": parkToDisplay[0].fullName,
                "dateVisited": event.target.date.value,
                "parkCode": parkToDisplay[0].parkCode
              })
        })
        .then(res => res.json())
        .then(newStamp => setStamps(prevValue => [...prevValue, newStamp]))
        
        event.target.reset();
    }

    return (
        <div>
            {/* {featuredImage} */}
            <h1>{parkToDisplay[0].fullName}</h1>
            <h5>State: {parkToDisplay[0].states}</h5>
            <p>{parkToDisplay[0].description}</p>
            
            {isVisited ? <p>Visited!</p> : <form onSubmit={handleSubmit}>
                <input name="date" type="date" />
                <button>Stamp!</button>
            </form> }
            
            <ImageCarousel parkToDisplay={parkToDisplay} />
            <h2>Activities:</h2>
            <ul>
                {activities}
            </ul>
        </div>
    )
}

export default ParkPage;