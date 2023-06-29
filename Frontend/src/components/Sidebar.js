import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import '../stylesheets/Sidebar.css';

function Sidebar({ setState, getResources, currUser }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories()
  }, []);

  function getCategories () {
    fetch('http://127.0.0.1:5000/categories')
    .then(res => res.json())
    .then(res => {
      setCategories(res)
    })
  }

  const categoryDisplay = categories.map(category => {
    return (
      <button
        className='sidebar-button'
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
        <h5 className='profile-name'>
          {currUser.first_name}
        </h5>
        <h5 className='profile-bio'>
          {currUser.bio}
        </h5>
        <div className='button-container'>
          {categoryDisplay}
        </div>
      </div>
  );
}

export default Sidebar