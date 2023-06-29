import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from './Login'
import Home from './Home'
import IdeaForm from './IdeaForm'
import Category from './Category'
import Profile from './Profile'
import Ideas from './Ideas'
import IdeaGenerator from './IdeaGenerator'

function App () {
  const [ currUser, setCurrUser ] = useState(null);

  return (
    <BrowserRouter>
     <Routes>
       <Route path="/" element={<Login setCurrUser={setCurrUser}/>} />
       <Route path='/home' element={<Home currUser={currUser} setCurrUser={setCurrUser} />}/>
       <Route path="/IdeaForm" element={<IdeaForm currUser={currUser} setCurrUser={setCurrUser}/>} />
       <Route path="/Category" element={<Category currUser={currUser} setCurrUser={setCurrUser}/>} />
       <Route path="/Profile/:id" element={<Profile currUser={currUser} setCurrUser={setCurrUser}/>} />
       <Route path="/Ideas/:id" element={<Ideas currUser={currUser} setCurrUser={setCurrUser}/>} />
       <Route path="/Login" element={<Login currUser={currUser} setCurrUser={setCurrUser}/>} />
       <Route path="/IdeaGenerator" element={<IdeaGenerator currUser={currUser} setCurrUser={setCurrUser}/>} />
     </Routes>
   </BrowserRouter>
  )
}

export default App;
