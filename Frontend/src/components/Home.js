import '../stylesheets/home.css';
import { useEffect, useState } from 'react';
import NavBar from "./NavBar";
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
        key={category.name}
        name={category.name}
        description={category.description}
      />
    )
  })

  return (
    <>
      <NavBar />
      <div className="home-title">
        <h2>Share, Discover, and Create your Genius Ideas</h2>
        <h2>What we're about:</h2>
        <h2>What users are able to do</h2>
        <h2>Why this is the best website ever</h2>
        <h2>anything else we want to include</h2>
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