import { useState, useEffect } from 'react'
import Sidebar from "./Sidebar"
import NavBar from "./NavBar"
import { Link } from 'react-router-dom'
import '../stylesheets/Category.css'
import CategoryCard from './CategoryCard'
import { useLocation } from "react-router-dom";

function Category() {
  const location = useLocation();
  const currCategory = location.state;

  const [cards, setCards] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    getPrompts(currCategory.id)
  }, []);

  const generateIdea = () => {
    const newCard = {
      id: cards.length + 1,
      title: "New Card Title",
      content: "New Card Content"
    };
    setCards(prevCards => [...prevCards, newCard]);
  };

  function getPrompts (id) {
    fetch(`http://127.0.0.1:5000/promptbycategory/${id}`)
    .then(res => res.json())
    .then(res => {
      setPrompts(res)
      console.log(prompts)
    })
  }

  const promptsDisplay = prompts.map(prompt => {
    return (
      <CategoryCard
        className='category-card'
        key={prompt.title}
        name={prompt.title}
        description={prompt.description} 
      />
    )
  })

  return (
    <div>
      <NavBar />
      <div className="headerimage d-flex justify-content-center">
        This is a giant image
      </div>
      <div className="container">
        <div className="row justify-content-left align-items-stretch">
          <div className="col-md-2 custom-height sidebar-wrapper">
            <Sidebar setState={setSelectedCategory} getResources={getPrompts}/>
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
        <div className='card-display'>
          {promptsDisplay}
        </div>
        {/* <div className="row mt-4">
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
        </div> */}
        </div>
    </div>
  );
}

export default Category;
