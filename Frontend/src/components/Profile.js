import { useState } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import "../stylesheets/Profile.css";

function Profile() {
  const [showSavedIdeas, setShowSavedIdeas] = useState(true);

  const toggleIdeas = () => {
    setShowSavedIdeas(!showSavedIdeas);
  };

  // Mock data for saved and created ideas
  const savedIdeas = [
    {
      id: 1,
      title: "Saved Idea 1",
      description: "This is a saved idea.",
    },
    {
      id: 2,
      title: "Saved Idea 2",
      description: "This is another saved idea.",
    },
  ];

  const createdIdeas = [
    {
      id: 1,
      title: "Created Idea 1",
      description: "This is a created idea.",
    },
    {
      id: 2,
      title: "Created Idea 2",
      description: "This is another created idea.",
    },
  ];

  const ideasToShow = showSavedIdeas ? savedIdeas : createdIdeas;

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row justify-content-left align-items-stretch">
          <div className="col-md-2 custom-height sidebar-wrapper">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <div className="row align-items-center g-5">
              <div className="col-md-4">
                <div className="text-center mt-5">
                  <img
                    className="rounded-circle"
                    src="https://i.redd.it/yeat-cat-i-made-v0-26w7muek6jx81.png?s=c309c167fbdf4a8bb4c6ab6d0ffc153d14421967"
                    alt="Profile Picture"
                    width="150"
                    height="150"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-12">
                    <h4>Yeat Cat</h4>
                  </div>
                  <div className="col-md-12">
                    <p>Drip is forever</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container mt-4">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <button className="btn btn-primary" onClick={toggleIdeas}>
                    {showSavedIdeas ? "Ideas saved" : "Ideas created"}
                  </button>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-12">
                  {ideasToShow.map((idea) => (
                    <div className="card w-75 mb-3" key={idea.id}>
                      <div className="card-body">
                        <h5 className="card-title">{idea.title}</h5>
                        <p className="card-text">{idea.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
