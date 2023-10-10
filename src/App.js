import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Search from './search';
import Show from './show';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/show/:id" element={<Show />} />
      </Routes>
    </Router>
  );
}

export default App;
