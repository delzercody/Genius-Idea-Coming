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
       <Route path='/home' element={<Home currUser={currUser}/>}/>
       <Route path="/IdeaForm" element={<IdeaForm currUser={currUser}/>} />
       <Route path="/Category" element={<Category currUser={currUser}/>} />
       <Route path="/Profile/:id" element={<Profile currUser={currUser}/>} />
       <Route path="/Ideas/:id" element={<Ideas currUser={currUser}/>} />
       <Route path="/Login" element={<Login currUser={currUser}/>} />
       <Route path="/IdeaGenerator" element={<IdeaGenerator currUser={currUser}/>} />
     </Routes>
   </BrowserRouter>
  )
}

export default App;
