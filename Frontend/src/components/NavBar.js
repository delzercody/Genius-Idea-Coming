import "../stylesheets/NavBar.css"

function NavBar () {

return (
    <div className="nav-bar">
        <h1 className="page-title">Genius Ideas</h1>
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