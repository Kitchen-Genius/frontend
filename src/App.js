import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import SignIn from './components/SignIn';
import Home from './components/Home';
import HomeP2 from './components/Page2Components/HomeP2';
import HomeP3 from './components/Page3Components/HomeP3';


function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/components/Home" element={<Home />} />
          <Route path="/components/Page2Components/HomeP2" element={<HomeP2 />} />
          <Route path="/components/Page3Components/HomeP3" element={<HomeP3 />} />
        </Routes>
      </Router>
   
    </div>
  );
}

export default App;
