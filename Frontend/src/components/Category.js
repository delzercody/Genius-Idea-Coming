import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import { Link, useLocation } from 'react-router-dom';
import '../stylesheets/Category.css';
import CategoryCard from './CategoryCard';

function Category({ currUser, setCurrUser }) {
  const location = useLocation();
  const currCategory = location.state;

  const [prompts, setPrompts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([{}]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    getPrompts(currCategory ? currCategory.id : 1);
    setSelectedCategory(currCategory);
  }, [currCategory]);

  function getResources(id) {
    getPrompts(id);
  }

  const generateIdea = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const randomPrompt = prompts[randomIndex];
  
    const newCard = {
      title: randomPrompt.title,
      description: randomPrompt.description,
    };
  
    const updatedPrompts = prompts.filter((prompt, index) => index !== randomIndex);
  
    setPrompts([newCard, ...updatedPrompts]);
  }
  

  const deletePrompt = (index) => {
    const promptId = prompts[index].id;
  
    fetch(`http://127.0.0.1:5000/prompts/${promptId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => {
        const updatedPrompts = prompts.filter((_, i) => i !== index);
        setPrompts(updatedPrompts);
      })
      .catch((error) => {
      })
  }

  const editPrompt = (index, newDescription) => {
    if (prompts[index].user_id === currUser.id) {
      setEditIndex(index);
      setEditedTitle(prompts[index].title);
      setEditedDescription(prompts[index].description);
    }
  }

  const saveEdit = () => {
    if (editIndex !== null) {
      const updatedPrompts = [...prompts];
      updatedPrompts[editIndex].title = editedTitle;
      updatedPrompts[editIndex].description = editedDescription;
      setPrompts(updatedPrompts);
      setEditIndex(null);
      setEditedTitle('');
      setEditedDescription('');

      const promptId = prompts[editIndex].id;
      const updatedPrompt = {
        title: editedTitle,
        description: editedDescription,
      };

      fetch(`http://127.0.0.1:5000/prompts/${promptId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPrompt),
      })
        .then((res) => res.json())
        .then((res) => {
        })
        .catch((error) => {
        })
    }
  }

  const cancelEdit = () => {
    setEditIndex(null);
    setEditedTitle('');
    setEditedDescription('');
  }

  const getPrompts = (id) => {
    fetch(`http://127.0.0.1:5000/promptbycategory/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setPrompts(res)
      })
  }

  const promptsDisplay = prompts.map((prompt, index) => (
    <div className="row mt-4" key={prompt.name}>
      <div className="col-md-5 offset-md-2">
        {editIndex === index ? (
          <div>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            ></textarea>
            <div>
              <button type="button" onClick={saveEdit}>Save</button>
              <button type="button" onClick={cancelEdit}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <CategoryCard
              key={prompt.name}
              className="category-prompt"
              name={prompt.title}
              description={prompt.description}
            />

            {prompt.user_id === currUser.id && (
              <div>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => editPrompt(index, prompt.content)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => deletePrompt(index)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  ));

  return (
    <div>
      <NavBar setCurrUser = {setCurrUser} />
      <div className="headerimage d-flex justify-content-center">
        This is a giant image
      </div>
      <div className="container">
        <div className="row justify-content-left align-items-stretch">
          <div className="col-md-2 custom-height sidebar-wrapper">
            <Sidebar setState={setSelectedCategory} getResources={getResources} currUser={currUser} />
          </div>
          <div className="col-md-5">
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={generateIdea}
              >
                Generate an idea
              </button>
            </div>
            {promptsDisplay.length > 0 && (
              <div className="container" style={{ marginTop: '300px', justifyContent: 'center' }}>
                {promptsDisplay}
              </div>
            )}
          </div>
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            <Link to="/IdeaForm" state={{ currUser, currCategory }}className="btn btn-secondary">
              Create an Idea
            </Link>
            </div>
          </div>
        </div>
      </div>
  );
}


export default Category;

