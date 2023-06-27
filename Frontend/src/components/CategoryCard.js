function CategoryCard({
  name,
  description
}) {
    return (
      <div className="card-group">
        <div className="card">
          {/* <img src="image1.jpg" className="card-img-top" alt="Card 1" /> */}
        <div className="card">
          {/* <img src="image2.jpg" className="card-img-top" alt="Card 2" /> */}
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
          </div>
        </div>
        </div>
      </div>
    );
  }
  
  export default CategoryCard