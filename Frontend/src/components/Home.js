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
    fetch("http://127.0.0.1:5555/categories")
      .then(res => res.json())
      .then(res => {
        setCategories(res)
      })
      .catch(error => alert(error));
  }

  const categoryDisplay = categories.map(category => {
    return (
        <CategoryCard
          className='category-card'
          self={category}
          key={category.name}
          name={category.name}
          description={category.description}
        />
    )
  })

  return (
    <>
      <NavBar setCurrUser = {setCurrUser} currUser={currUser}/>
      <div className='card-container'>
        {categoryDisplay}
      </div>
    </>
  )
}

export default Home
