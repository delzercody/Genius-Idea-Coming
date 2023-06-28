import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import App from './components/App'
import Form from './components/IdeaForm'
import Category from './components/Category'
import Profile from './components/Profile'
import Ideas from './components/Ideas'

import Login from './components/Login'

import IdeaGenerator from './components/IdeaGenerator'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/IdeaForm" element={<Form />} />
      <Route path="/Category" element={<Category />} />
      <Route path="/Profile/:id" element={<Profile />} />
      <Route path="/Ideas/:id" element={<Ideas />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/IdeaGenerator" element={<IdeaGenerator />} />
    </Routes>
  </BrowserRouter>
)
