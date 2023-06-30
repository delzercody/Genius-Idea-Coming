import '../stylesheets/CategoryCard.css'
import { Link } from 'react-router-dom';

function CategoryCard({
  name,
  self,
  description
}) {
    return (
        <div className='category-card'>
          <Link to="/category" state={self}>
            {name}
          </Link>
        </div>
    );
  }

  export default CategoryCard