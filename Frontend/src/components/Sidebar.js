import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../stylesheets/Sidebar.css';

function Sidebar({ setState, getResources, currUser }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
  }, []);

  function getCategories () {
    fetch('http://127.0.0.1:5555/categories')
    .then(res => res.json())
    .then(res => {
      setCategories(res)
    })
  }

  const categoryDisplay = categories.map(category => {
    return (
      <button
        className='button'
        key={category.name}
        onClick={() => {
          console.log(category)
          setState(category)
          getResources(category.id)
        }}
      >
      {category.name}
      </button>
    )
  })

  return (
      <div className="list-group linkbar sidebar">
        <div className="profile-picture">
          <Link to="/Profile/:id">
            <img src={currUser.avatar} alt="Profile" className="circle-image" />
          </Link>
        </div>
        <p className='profile-name'>
          {currUser.first_name}
        </p>
        <p className='profile-bio'>
          {currUser.bio}
        </p>
        <p>~~</p>
        <div className='button-container'>
          <button className='button'>
          <Link to="/IdeaGenerator">
            IdeaGenerator
          </Link>
          </button>
          {categoryDisplay}
        </div>
      </div>
  );
}

export default Sidebar