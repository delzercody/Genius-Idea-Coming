import React, { useState } from 'react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';

function IdeaGenerator({ currUser }) {
  const [inputWord, setInputWord] = useState('');
  const [generatedIdea, setGeneratedIdea] = useState('');
  const [cards, setCards] = useState([]);

  const handleInputChange = (event) => {
    setInputWord(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Submitting form');
      const response = await fetch('http://localhost:5000/api/generate-idea', {
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
      setCards([...cards, { title: inputWord, idea: data.generatedIdea }]);
      setInputWord('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="headerimage d-flex justify-content-center">
        This is a giant image
      </div>
      <div className="container">
        <div className="row justify-content-left align-items-stretch">
          <div className="col-md-2 custom-height sidebar-wrapper">
            <Sidebar currUser={currUser} />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <form onSubmit={handleSubmit}>
            <input type="text" value={inputWord} onChange={handleInputChange} />
            <button type="submit">Generate Idea</button>
          </form>
        </div>
        {cards.map((card, index) => (
          <div className="card w-75" key={index} style={{ marginLeft: '170px', justifyContent: 'center' }}>
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">{card.idea}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IdeaGenerator;

// random