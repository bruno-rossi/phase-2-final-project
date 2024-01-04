import React, { useState, useEffect } from "react";
import Images from "../components/Images";
import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./ParkPage.css";
import Stamp from "../components/Stamp";

function ParkPage() {

    const params = useParams();
    console.log(params);
    const {parks, search, setSearch, stamps, setStamps} = useOutletContext();
    const [isVisited, setIsVisited] = useState(false);
    const [pictures, setPictures] = useState([]);
    const [parkStamp, setParkStamp] = useState(stamps.find(stamp => stamp.parkCode === params.parkCode))

    // Resolve which park data to display for the page:
    const parkToDisplay = parks.data.filter(park => park.parkCode === params.parkCode);

    useEffect(() => {
        fetch("http://localhost:8000/pictures")
        .then(res => res.json())
        .then(data => {
            
            const currentParkPictures = data.filter(picture => picture.parkCode === params.parkCode);

            setPictures([...parkToDisplay[0].images, ...currentParkPictures]);

        })
    }, []);

    console.log(pictures);
    console.log(parkStamp);

    // Map activities to list items:
    const activities = parkToDisplay[0].activities.map(activity => <li key={activity.id}>{activity.name}</li>)

    // Define stamps functionality below:
    console.log(stamps);
    // const parkStamp = stamps.find(stamp => stamp.parkCode === params.parkCode);

    useEffect(() => {
        setIsVisited(stamps.some(stamp => stamp.parkCode === params.parkCode));
    }, [])

    function handleStampSubmit(event) {
        event.preventDefault();

        setIsVisited(prevValue => !prevValue);

        const newStamp = {
            "parkName": parkToDisplay[0].fullName,
            "dateVisited": event.target.date.value,
            "parkCode": parkToDisplay[0].parkCode
        }

        setParkStamp(newStamp);

        setStamps(() => [...stamps, newStamp]);

        console.log(stamps);

        fetch("http://localhost:8000/stamps", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newStamp)
        })
        // .then(res => res.json())
        // .then(newStamp => {setStamps(() => [...stamps, newStamp]);})
        
        event.target.reset();
    }

    // Define picture functionality below:

    function handlePictureSubmit(event) {
        event.preventDefault();

        fetch("http://localhost:8000/pictures", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "parkCode": parkToDisplay[0].parkCode,
                "url": event.target.picture.value,
                "caption": event.target.caption.value
              })
        })
        .then(res => res.json())
        .then(newPicture => setPictures(prevValue => [...prevValue, newPicture]))

        event.target.reset();

    }

    return (
        <div>
            <h1>{parkToDisplay[0].fullName}</h1>

            {pictures.length === 0 ? null : <Images pictures={pictures} />}

            {console.log(isVisited)}
            {/* {console.log(parkStamp)} */}
            <div id="form-box">
            {isVisited ? <Stamp stamp={parkStamp}/> : <form onSubmit={handleStampSubmit} id="stamp-form">
                <input name="date" type="date" />
                <button className="button">Stamp!</button>
            </form> }

            <form id="picture-form" onSubmit={handlePictureSubmit}>
                <input name="picture" type="text" placeholder="Enter picture URL here" />
                <input name="caption" type="text" placeholder="Enter picture caption here" />
                <button className="button">Submit</button>
            </form>
            </div>
            
            <h2>{parkToDisplay[0].designation} · {parkToDisplay[0].states}</h2>
            <p>{parkToDisplay[0].description}</p>
            <p>{parkToDisplay[0].directionsInfo}</p>

            <ul id="activities-list">
                {activities}
            </ul>
        </div>
    )
}

export default ParkPage;