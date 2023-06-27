import React, { useState } from 'react';
import Sidebar from './Sidebar';
import NavBar from './NavBar';

function IdeaGenerator() {
  const [inputWord, setInputWord] = useState('');
  const [generatedIdea, setGeneratedIdea] = useState('');

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
            <Sidebar />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <form onSubmit={handleSubmit}>
            <input type="text" value={inputWord} onChange={handleInputChange} />
            <button type="submit">Generate Idea</button>
          </form>
        </div>
        {generatedIdea && (
          <div className="generated-idea">
            <h3>Generated Idea:</h3>
            <p>{generatedIdea}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default IdeaGenerator;
