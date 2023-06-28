import '../stylesheets/CategoryCard.css'
import { Link } from 'react-router-dom';

function CategoryCard({
  name,
  self,
  description
}) {
    return (
        <div className="card">
        <Link to="/category" state={self} className="">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
          </div>
          </Link>
        </div>
    );
  }

  export default CategoryCard