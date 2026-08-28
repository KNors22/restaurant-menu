import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';
import ItemDetail from './pages/ItemDetail'
import {Routes, Route} from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu/:id" element={<ItemDetail />} />
      </Routes>
    </div>
  )
};
// comment

export default App;