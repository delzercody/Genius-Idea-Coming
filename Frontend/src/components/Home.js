import { useEffect, useState } from 'react';
import NavBar from "./NavBar";
import '../stylesheets/home.css';
import CategoryCard from './CategoryCard';

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect (() => {
    getCategories()
  }, []);

  function getCategories () {
    fetch ("http://127.0.0.1:5000/categories")
    .then(res => res.json())
    .then(res => {
      setCategories(res)
    })
    .catch(error => alert(error));
  }

  const categoryDisplay = categories.map(category => {
    return (
      <CategoryCard
        key={category.id}
        name={category.name}
        description={category.description}
      />
    )
  })

  return (
    <>
      <NavBar />
      <div className="home-title">
        <h1>Share, Discover, and Create your Genius Ideas</h1>
        <h3>What we're about:</h3>
        <h4>What users are able to do</h4>
        <h4>Why this is the best website ever</h4>
        <h4>anything else we want to include</h4>
      </div>
      <div className="home-body">
        <h3>Idea Categories</h3>
        <div className='category-container'>
          {categoryDisplay}
        </div>
      </div>
    </>
  )
}

export default Home;


//eric's thing
/* // <div>
    //   <div className="container">
    //     <div className="row">
    //     <h5 className="list-group-item">
    //       <Link className='sidebar-link' to="/Category/technology">Technology</Link>
    //     </h5>
    //     </div>
    //   </div>
    // </div> */