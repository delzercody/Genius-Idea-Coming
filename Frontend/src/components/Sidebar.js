import {Link} from 'react-router-dom'

function Sidebar() {
  return (
      <div className="list-group">
        <h5 className="list-group-item">
          <Link className='sidebar-link' to="/Form">Form</Link>
        </h5>
        <h5 className="list-group-item">
          <Link className='sidebar-link' to="/Category/cooking">Cooking</Link>
        </h5>
        <h5 className="list-group-item">
          <Link className='sidebar-link' to="/Category/technology">Technology</Link>
        </h5>
        <h5 className="list-group-item">
          <Link className='sidebar-link' to="/Category/home">Home Improvement</Link>
        </h5>
        <h5 className="list-group-item">
          <Link className='sidebar-link' to="/Category/art">Art</Link>
        </h5>
        <h5 className="list-group-item">
          <Link className='sidebar-link' to="/Category/business">Business</Link>
        </h5>
      </div>
  );
}

export default Sidebar