import '../stylesheets/CategoryCard.css'

function CategoryCard({
  name,
  description
}) {
    return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
          </div>
        </div>
    );
  }

  export default CategoryCard