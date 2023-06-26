import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div>
      <div className="container">
        <div className="row">
        <h5 className="list-group-item">
          <Link className='sidebar-link' to="/Category/technology">Technology</Link>
        </h5>
        </div>
      </div>
    </div>
  );
}

export default Home;
