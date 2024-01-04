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
    const [pictures, setPictures] = useState([]);

    // Resolve which park data to display for the page:
    const parkToDisplay = parks.data.filter(park => park.parkCode === params.parkCode);

    // Map activities to list items:
    const activities = parkToDisplay[0].activities.map(activity => <li key={activity.id}>{activity.name}</li>)

    // Define stamps functionality below:
    console.log(stamps);

    const colors = [ "maroon", "purple", "seagreen", "teal", "darkslateblue", "olive", "teal", "goldenrod", "mediumvioletred", "seagreen"];
    const radii = [ "10%", "20%", "30%", "40%", "50%", "60%", "40%", "30%", "20%", "10%" ];
    const borderStyles = [ "double", "ridge", "groove", "double", "ridge", "groove", "double", "ridge", "groove", "double"];

    function randomizeStamp() {
        return Math.floor(Math.random() * 10 - 1);
    }

    console.log(randomizeStamp());

    useEffect(() => {
        setIsVisited(stamps.some(stamp => stamp.parkCode === params.parkCode));
    }, [])

    function handleStampSubmit(event) {
        event.preventDefault();

        setIsVisited(prevValue => !prevValue);

        const randomColor = colors[randomizeStamp()];
        const randomRadius = radii[randomizeStamp()];
        const randomStyle = borderStyles[randomizeStamp()]

        fetch("http://localhost:8000/stamps", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "parkName": parkToDisplay[0].fullName,
                "dateVisited": event.target.date.value,
                "parkCode": parkToDisplay[0].parkCode,
                "color": randomColor,
                "borderStyle": randomStyle,
                "borderRadius": randomRadius
              })
        })
        .then(res => res.json())
        .then(newStamp => setStamps(prevValue => [...prevValue, newStamp]))

        event.target.reset();
    }

    // const featuredImage = parkToDisplay[0].images.length !== 0 ? <img id="featured-image" src={parkToDisplay[0].images[0].url} alt={parkToDisplay[0].images[0].altText} /> : null;

    // Define picture functionality below:

    useEffect(() => {
        fetch("http://localhost:8000/pictures")
        .then(res => res.json())
        .then(data => {
            
            const currentParkPictures = data.filter(picture => picture.parkCode === params.parkCode);
            setPictures(currentParkPictures)})
    }, [])

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
            {/* {featuredImage} */}
            <h1>{parkToDisplay[0].fullName}</h1>

            {/* <h2>Pictures:</h2> */}
            {pictures.length === 0 ? null : <ImageCarousel pictures={pictures} />}

            <div id="stamp-box">
            {isVisited ? <p>Visited!</p> : <form onSubmit={handleStampSubmit} id="stamp-form">
                <input name="date" type="date" />
                <button>Stamp!</button>
            </form> }
            </div>
            
            {/* 
            <p>State: {parkToDisplay[0].states}</p> */}
            
            <p>{parkToDisplay[0].description}</p>
            {/* <hr /> */}

            {/* <hr /> */}

            {/* <h2>Activities:</h2> */}
            <ul id="activities-list">
                {activities}
            </ul>

            <form id="picture-form" onSubmit={handlePictureSubmit}>
                <input name="picture" type="text" placeholder="Enter picture URL here" />
                <input name="caption" type="text" placeholder="Enter picture caption here" />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default ParkPage;