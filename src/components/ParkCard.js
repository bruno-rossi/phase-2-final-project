import "./ParkCard.css";
import { Link } from "react-router-dom";

function ParkCard({park}) {

    // const featuredImage = park.images.length !== 0 ? <img src={park.images[0].url} alt={park.images[0].altText} /> : null;

    return (
        <div className="park-card">

            {/* {featuredImage} */}
            <h1>{park.name}</h1>
            <p>{park.description}</p>
            <Link to={`/parks/${park.parkCode}`} >More details</Link>
        </div>
    )
}

export default ParkCard;