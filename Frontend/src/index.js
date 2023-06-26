import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import App from './components/App'
import Home from './components/Home'
import Form from './components/Form'
import Category from './components/Category'
import Profile from './components/Profile'
import Ideas from './components/Ideas'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Form" element={<Form />} />
      <Route path="/Category/:ocassion" element={<Category />} />
      <Route path="/Profile/:id" element={<Profile />} />
      <Route path="/Ideas/:id" element={<Ideas />} />
    </Routes>
  </BrowserRouter>
)
