import "../stylesheets/navbar.css"
import {Link, useNavigate } from 'react-router-dom'
import Login from "./Login";

function NavBar ({setCurrUser, currUser }) {

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
    <div>
        <Link to="/home" className="home-link">
            <h1 className="page-title">Genius Ideas 💡 </h1>
        </Link>
        <h2 className='title'>share, discover, and create your genius ideas</h2>
    </div>
    {currUser ? (
        <div className="login-container">
            <h2 className='user'>hello {currUser.first_name}!</h2>
            <button className='button' onClick = {handleLogout}>
                log out
            </button>
        </div>
    ) : (
        null
    )}
  </div>
)
};

export default NavBar;