import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
    return (
        <nav>
            <NavLink to={"/"} className="nav-link">Parks</NavLink>
            <NavLink to={"/passport"} className="nav-link">Passport</NavLink>
        </nav>
    )
}

export default NavBar;