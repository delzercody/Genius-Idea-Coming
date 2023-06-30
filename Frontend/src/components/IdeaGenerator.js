import React, { useState } from 'react'
import Sidebar from './Sidebar'
import NavBar from './NavBar'
import '../stylesheets/IdeaGenerator.css'

function IdeaGenerator({ currUser, setCurrUser }) {
  const [inputWord, setInputWord] = useState('');
  const [generatedIdea, setGeneratedIdea] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cards, setCards] = useState([]);

  const handleInputChange = (event) => {
    setInputWord(event.target.value);
  };

  const handleCategoryChange = (category, index) => {
    const newCards = [...cards];
    let categoryNumber;
  
    switch (category) {
      case 'Cooking':
        categoryNumber = 1;
        break;
      case 'Home Improvement':
        categoryNumber = 2;
        break;
      case 'Art':
        categoryNumber = 3;
        break;
      case 'Business':
        categoryNumber = 4;
        break;
      case 'Technology':
        categoryNumber = 5;
        break;
      default:
        categoryNumber = '';
    }
  
    newCards[index] = { ...newCards[index], category: categoryNumber };
    setCards(newCards);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Submitting form');
      const response = await fetch('http://localhost:5555/api/generate-idea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputWord }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate idea');
      }
      const data = await response.json();
      console.log('Received response:', data);
      setGeneratedIdea(data.generatedIdea);
      setCards([...cards, { title: inputWord, idea: data.generatedIdea, category: '' }]);
      setInputWord('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePostIdea = async (index, event) => {
    event.preventDefault()
    const selectedCard = cards[index]
    const categoryNumber = selectedCard.category
  
    try {
      const response = await fetch('http://127.0.0.1:5555/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: selectedCard.title,
          description: selectedCard.idea,
          user_id: currUser.id,
          category_id: categoryNumber,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to post idea');
      }
      console.log('Idea posted successfully');
    } catch (error) {
      console.error('Error:', error)
    }
  };

  return (
    <div>
      <NavBar setCurrUser={setCurrUser} />
      <div className="container">
        <div className="row justify-content-left align-items-stretch">
          <div className="col-md-2 custom-height sidebar-wrapper">
            <Sidebar currUser={currUser} />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <form onSubmit={handleSubmit}>
            <input type="text" value={inputWord} onChange={handleInputChange} />
            <button className='button' type="submit">Generate Idea</button>
          </form>
        </div>
        {cards.map((card, index) => (
          <div
            className="card w-75"
            key={index}
            style={{ marginLeft: '170px', justifyContent: 'center', height: '500px' }}
          >
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.idea}</p>
              <div className="dropdown my-dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id={`dropdownMenu${index}`}
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {card.category || 'Category'}
                </button>
                <div className="dropdown-menu" aria-labelledby={`dropdownMenu${index}`}>
                  <button className="dropdown-item" onClick={() => handleCategoryChange('Cooking', index)}>
                    Cooking
                  </button>
                  <button className="dropdown-item" onClick={() => handleCategoryChange('Home Improvement', index)}>
                    Home Improvement
                  </button>
                  <button className="dropdown-item" onClick={() => handleCategoryChange('Art', index)}>
                    Art
                  </button>
                  <button className="dropdown-item" onClick={() => handleCategoryChange('Business', index)}>
                    Business
                  </button>
                  <button className="dropdown-item" onClick={() => handleCategoryChange('Technology', index)}>
                    Technology
                  </button>
                </div>
              </div>
              <button className="btn btn-primary" onClick={(event) => handlePostIdea(index, event)}>
                Post Idea
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IdeaGenerator
