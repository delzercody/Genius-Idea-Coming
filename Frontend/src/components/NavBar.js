import "../stylesheets/NavBar.css"
import {Link} from 'react-router-dom'
import Login from "./Login";

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
        {/* <Link to = "/login" className="login-link" >
            <button className="login-button">
                Login
                <Login />
            </button>
        </Link> */}
    </div>
)
};

export default NavBar;