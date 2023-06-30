import "../stylesheets/NavBar.css"
import {Link, useNavigate } from 'react-router-dom'
import Login from "./Login";

function NavBar ({setCurrUser}) {

  const navigate = useNavigate()

  function handleLogout() {
      fetch('http://127.0.0.1:5000/logout').then((r) => {
          if (r.ok) {
              setCurrUser(null);
              navigate("/")
          }
      })
  }

return (
  <div className="nav-bar">
      <Link to="/home" className="home-link">
      <h1 className="page-title">Genius Ideas</h1>
      </Link>
      <input
          className="search-input"
          placeholder="Search"
          type="text">
      </input>
          <button onClick = {handleLogout} className="logout-button">
              Log out
          </button>
  </div>
)
};

export default NavBar;