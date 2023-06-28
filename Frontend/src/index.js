import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import App from './components/App'
import Form from './components/IdeaForm'
import Category from './components/Category'
import Profile from './components/Profile'
import Ideas from './components/Ideas'
import Home from './components/Home'

import Login from './components/Login'

import IdeaGenerator from './components/IdeaGenerator'
import IdeaForm from './components/IdeaForm'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path='/home' element={<Home />}/>
      <Route path="/IdeaForm" element={<IdeaForm />} />
      <Route path="/Category" element={<Category />} />
      <Route path="/Profile/:id" element={<Profile />} />
      <Route path="/Ideas/:id" element={<Ideas />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/IdeaGenerator" element={<IdeaGenerator />} />
    </Routes>
  </BrowserRouter>
)
