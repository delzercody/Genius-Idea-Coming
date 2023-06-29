import React, { useState } from "react"
import NavBar from "./NavBar"
import Sidebar from "./Sidebar"
import "../stylesheets/Profile.css"

const Profile = ({ currUser, setCurrUser }) => {
  const [showSavedIdeas, setShowSavedIdeas] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [user, setUser] = useState(currUser);
  const [updatedUser, setUpdatedUser] = useState({
    first_name: currUser.first_name,
    last_name: currUser.last_name,
    bio: currUser.bio,
    location: currUser.location,
  });

  const toggleIdeas = () => {
    setShowSavedIdeas(!showSavedIdeas);
  };

  const toggleEditingProfile = () => {
    setEditingProfile(!editingProfile);
  };

  const handleProfileFieldChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const updateUserProfile = () => {
    const user_id = currUser.id; // Use the ID of the current user

    const updatedFields = {
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      bio: updatedUser.bio,
      location: updatedUser.location,
    };

    fetch(`http://127.0.0.1:5000/users/${user_id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedFields),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated user:", data)
        setUser(data)
        toggleEditingProfile()
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  return (
    <div>
      <NavBar setCurrUser = {setCurrUser}/>
      <div className="container">
        <div className="row justify-content-left align-items-stretch">
          <div className="col-md-2 custom-height sidebar-wrapper">
            <Sidebar currUser={currUser} />
          </div>
          <div className="col-md-10">
            <div className="row align-items-center g-5">
              <div className="col-md-4">
                <div className="text-center mt-5">
                  <img
                    className="rounded-circle"
                    src={user.avatar}
                    alt="Profile Picture"
                    width="150"
                    height="150"
                  />
                </div>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-12">
                    {editingProfile ? (
                      <input
                        type="text"
                        name="first_name"
                        value={updatedUser.first_name}
                        onChange={handleProfileFieldChange}
                      />
                    ) : (
                      <h2>{user.first_name}</h2>
                    )}
                  </div>
                  <div className="col-md-12">
                    {editingProfile ? (
                      <input
                        type="text"
                        name="last_name"
                        value={updatedUser.last_name}
                        onChange={handleProfileFieldChange}
                      />
                    ) : (
                      <h2>{user.last_name}</h2>
                    )}
                  </div>
                  <div className="col-md-12">
                    {editingProfile ? (
                      <input
                        type="text"
                        name="bio"
                        value={updatedUser.bio}
                        onChange={handleProfileFieldChange}
                      />
                    ) : (
                      <h3>{user.bio}</h3>
                    )}
                  </div>
                  <div className="col-md-12">
                    {editingProfile ? (
                      <input
                        type="text"
                        name="location"
                        value={updatedUser.location}
                        onChange={handleProfileFieldChange}
                      />
                    ) : (
                      <h3>{user.location}</h3>
                    )}
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
                  {editingProfile ? (
                    <button
                      className="btn btn-primary"
                      onClick={updateUserProfile}
                    >
                      Save Profile
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={toggleEditingProfile}
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile
