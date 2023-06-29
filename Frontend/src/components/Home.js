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
        <h1>Share, Discover, and Create your Genius Ideas</h1>
      </div>
      <h2 className = "current-user" >Welcome back, {currUser.username}!</h2>
      <div className="home-body">
        <h3 className='idea-cat' >Idea Categories</h3>
        <div className="row justify-content-md-center">
          {categoryDisplay}
        </div>
      </div>
    </>
  )
}

export default Home
