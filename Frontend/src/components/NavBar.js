import "../stylesheets/navbar.css"
import {Link} from 'react-router-dom'

function NavBar () {

return (
    <div className="nav-bar">
        <Link to="/" className="home-link">
        <h1 className="page-title">Genius Ideas</h1>
        </Link>
        <input
            className="search-input"
            placeholder="Search"
            type="text">
        </input>
        <button className="login-button">
            Login
        </button>
    </div>
)
};

export default NavBar;