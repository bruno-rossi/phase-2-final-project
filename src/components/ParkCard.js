import "./ParkCard.css";
import { Link } from "react-router-dom";

function ParkCard({park}) {

    return (
        <div className="park-card">

            <h1>{park.name}</h1>
            <p>{park.description}</p>
            <Link to={`/parks/${park.parkCode}`} >More details</Link>
        </div>
    )
}

export default ParkCard;