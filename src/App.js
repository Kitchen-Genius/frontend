import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import SignIn from './components/SignIn';
import Home from './components/Home';
import HomeP2 from './components/Page2Components/HomeP2';
import HomeP3 from './components/Page3Components/HomeP3';
import { useSelector } from 'react-redux';
import Favorites from './components/Page4Components/Favorites';



function App() {
  const user = useSelector(state => state.user)
 
  return (
    <div className="App">
    
   
      <Router>
        <Routes>
          <Route path="/" element={<SignIn  />} />
          {user.email?<><Route path="/components/Home" element={<Home />} />
          <Route path="/components/Page2Components/HomeP2" element={<HomeP2  />} />
          <Route path="/components/Page3Components/HomeP3" element={<HomeP3 />} />
          <Route path="/components/Favorites" element={<Favorites />} /></>:
          <Route path='*' element={<SignIn />} />  }
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
