import {Link} from 'react-router-dom'
import '../stylesheets/Sidebar.css'

function Sidebar() {
  return (
      <div className="list-group linkbar sidebar">
        <hr className='bar'></hr>
        <h5 className="list">
          <Link className='sidebar-link' to="/Form">Form</Link>
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