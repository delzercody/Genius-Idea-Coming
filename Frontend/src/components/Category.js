import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import { Link, useLocation } from 'react-router-dom';
import '../stylesheets/Category.css';
import CategoryCard from './CategoryCard';

function Category({ currUser }) {
  const location = useLocation();
  const currCategory = location.state;

  const [prompts, setPrompts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([{}]);

  useEffect(() => {
    getPrompts(currCategory ? currCategory.id : 1);
    setSelectedCategory(currCategory);
  }, [currCategory]);

  function getResources (id) {
    getPrompts(id)
  }

  const generateIdea = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const randomPrompt = prompts[randomIndex];

    const newCard = {
      title: randomPrompt.title,
      content: randomPrompt.description,
    };
    setPrompts(prompts.shift())
    setPrompts([newCard, ...prompts]);
  };

  const getPrompts = (id) => {
    fetch(`http://127.0.0.1:5000/promptbycategory/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setPrompts(res);
      });
  };

  const promptsDisplay = prompts.map((prompt) => (
    <div className="row mt-4" key={prompt.name}>
      <div className="col-md-10 offset-md-2">
        <CategoryCard
          key={prompt.name}
          className="category-prompt"
          name={prompt.title}
          description={prompt.content}
        />
      </div>
    </div>
  ));

  return (
    <div>
      <NavBar />
      <div className="headerimage d-flex justify-content-center">
        This is a giant image
      </div>
      <div className="container">
        <div className="row justify-content-left align-items-stretch">
          <div className="col-md-2 custom-height sidebar-wrapper">
            <Sidebar setState={setSelectedCategory} getResources={getResources} currUser={currUser}/>
          </div>
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={generateIdea}
            >
              Generate an idea
            </button>
          </div>
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            <Link to="/IdeaForm" state={{ currUser, currCategory }}className="btn btn-secondary">
              Create an Idea
            </Link>
          </div>
        </div>
      </div>
      {promptsDisplay.length > 0 && (
        <div className="container" style={{ marginTop: '300px', justifyContent: 'center' }}>
          {promptsDisplay}
        </div>
      )}
    </div>
  );
}

export default Category;
