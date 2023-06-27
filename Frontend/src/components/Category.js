import { useState } from 'react'
import Sidebar from "./Sidebar"
import NavBar from "./NavBar"
import {Link} from 'react-router-dom'
import '../stylesheets/Category.css'

function Category() {
  const [cards, setCards] = useState([]);

  const generateIdea = () => {
    const newCard = {
      id: cards.length + 1,
      title: "New Card Title",
      content: "New Card Content"
    };
    setCards(prevCards => [...prevCards, newCard]);
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
          <div className="col-md-5 d-flex justify-content-center align-items-center">
            <button type="button" className="btn btn-secondary" onClick={generateIdea}>
              Generate an idea
            </button>
          </div>
          <div className="col-md-5 d-flex justify-content-center align-items-center">
          <Link to="/IdeaForm" className="btn btn-secondary">Create an Idea</Link>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-10 offset-md-2">
            <div className="card-container" style={{ marginTop: '300px' }}>
              {cards.map(card => (
                <div className="card mb-3" key={card.id}>
                  <div className="card-body">
                    <div className="card-title text-center">{card.title}</div>
                    <div className="card-text text-center">{card.content}</div>
                    <div className="d-flex justify-content-between mt-2">
                      <div>
                        <a href="#" className="btn btn-primary">Add to Collection</a>
                      </div>
                      <div>
                        <a href="#" className="btn btn-primary">Comment</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
