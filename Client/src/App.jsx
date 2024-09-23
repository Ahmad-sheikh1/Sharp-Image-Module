import React from 'react';
import Uploader from './Components/Uploader';
import './App.css'
import Navbar from './Components/Navbar';
import { Router, Routes, Route } from "react-router-dom"
import MetaDeta from './Components/MetaData';

const App = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/Resize' element={<Uploader />} />
        <Route path='/MetaData' element={<MetaDeta />} />
      </Routes>

    </>
  );
}

export default App;
