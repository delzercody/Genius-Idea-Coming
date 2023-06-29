import '../stylesheets/home.css';
import { useEffect, useState } from 'react';
import NavBar from "./NavBar";
import CategoryCard from './CategoryCard';

function Home({ currUser, setCurrUser }) {
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    getCategories()
  }, []);

  function getCategories() {
    fetch("http://127.0.0.1:5000/categories")
      .then(res => res.json())
      .then(res => {
        setCategories(res)
      })
      .catch(error => alert(error));
  }

  const categoryDisplay = categories.map(category => {
    return (
      <div className="col-md-3 col-sm-4 col-xl-2 home_cards" key={category.name}>
        <CategoryCard
          self={category}
          key={category.name}
          name={category.name}
          description={category.description}
        />
      </div>
    )
  })

  return (
    <>
      <NavBar setCurrUser = {setCurrUser} />
      <div className="home-title">
        <h2>Share, Discover, and Create your Genius Ideas</h2>
        <h2>What we're about:</h2>
        <h2>What users are able to do</h2>
        <h2>Why this is the best website ever</h2>
        <h2>anything else we want to include</h2>
      </div>
      <h4>Current User: {currUser.username}</h4>
      <div className="home-body">
        <h3>Idea Categories</h3>
        <div className="row justify-content-md-center">
          {categoryDisplay}
        </div>
      </div>
    </>
  )
}

export default Home
