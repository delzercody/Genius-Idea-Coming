import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import "../stylesheets/Profile.css";

const Profile = ({ currUser, setCurrUser }) => {
  const [editingProfile, setEditingProfile] = useState(false);
  // const [user, setUser] = useState(currUser);
  const [prompts, setPrompts] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({
    first_name: currUser.first_name,
    last_name: currUser.last_name,
    bio: currUser.bio,
    location: currUser.location,
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    const id = currUser.id;
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/users/${id}`);
        const data = await response.json();
        // setUser(data);
        setPrompts(data.prompts);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUser();
  }, [currUser.id]);

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
        // setUser(data);
        toggleEditingProfile();
      })
      .catch((error) => {
        console.error("Error:", error)
      });
  }

  const deletePrompt = (index) => {
    const promptId = prompts[index].id
    fetch(`http://127.0.0.1:5000/prompts/${promptId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        const updatedPrompts = prompts.filter((prompt) => prompt.id !== promptId);
        setPrompts(updatedPrompts);
      })
      .catch((error) => {
        console.error("Error:", error)
      });
  }
  

  const editPrompt = (index, newDescription) => {
    if (prompts[index].user_id === currUser.id) {
      setEditIndex(index);
      setEditedTitle(prompts[index].title);
      setEditedDescription(prompts[index].description);
    }
  };

  const saveEdit = () => {
    if (editIndex !== null) {
      const updatedPrompts = [...prompts];
      updatedPrompts[editIndex].title = editedTitle;
      updatedPrompts[editIndex].description = editedDescription;
      setPrompts(updatedPrompts);
      setEditIndex(null);
      setEditedTitle("");
      setEditedDescription("");

      const promptId = prompts[editIndex].id;
      const updatedPrompt = {
        title: editedTitle,
        description: editedDescription,
      };

      fetch(`http://127.0.0.1:5000/prompts/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPrompt),
      })
        .then((res) => res.json())
        .then((res) => {})
        .catch((error) => {});
    }
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditedTitle("");
    setEditedDescription("");
  };

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
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{prompt.title}</h5>
                <p className="card-text">{prompt.description}</p>
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
            </div>
          </div>
        )}
      </div>
    </div>
  ));
  

  return (
    <div>
      <NavBar setCurrUser={setCurrUser} />
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
                    src={currUser.avatar}
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
                      <h2>{currUser.first_name}</h2>
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
                      <h2>{currUser.last_name}</h2>
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
                      <h3>{currUser.bio}</h3>
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
                      <h3>{currUser.location}</h3>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="container mt-4">
              <div className="row justify-content-center">
                <div className="col-md-6">
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
            {promptsDisplay}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
