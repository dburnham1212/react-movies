import "../../styles/nav/Navbar.css";
import {Link} from "react-router-dom"

const Navbar = () => {
    return (
        <nav>
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/browse">Browse</Link>
            <Link className="nav-link" to="/search">Search</Link>
        </nav>
    );
};

export default Navbar;