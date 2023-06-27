import {Link} from 'react-router-dom'
import '../stylesheets/Sidebar.css'

function Sidebar() {
  return (
      <div className="list-group linkbar sidebar">
        <div className="profile-picture">
          <Link to="/Profile/:id">
            <img src="https://i.redd.it/yeat-cat-i-made-v0-26w7muek6jx81.png?s=c309c167fbdf4a8bb4c6ab6d0ffc153d14421967" alt="Profile" className="circle-image" />
          </Link>
        </div>
        <h5 className='profile-name'>
          Yeat Cat
        </h5>
        <h5 className='profile-bio'>
          Drip is forever
        </h5>
        <hr className='bar'></hr>
        <h5 className="list">
          <Link className='sidebar-link' to="/IdeaForm">Form</Link>
        </h5>
        <h5 className="list">
          <Link className='sidebar-link' to="/Category/cooking">Cooking</Link>
        </h5>
        <h5 className="list">
          <Link className='sidebar-link' to="/Category/technology">Technology</Link>
        </h5>
        <h5 className="list">
          <Link className='sidebar-link' to="/Category/home">Home Improvement</Link>
        </h5>
        <h5 className="list">
          <Link className='sidebar-link' to="/Category/art">Art</Link>
        </h5>
        <h5 className="list">
          <Link className='sidebar-link' to="/Category/business">Business</Link>
        </h5>
      </div>
  );
}

export default Sidebar