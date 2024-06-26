import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import SignIn from './components/SignIn';
import Home from './components/Home';
import HomeP2 from './components/Page2Components/HomeP2';
import HomeP3 from './components/Page3Components/HomeP3';
import { useSelector } from 'react-redux';
import Favorites from './components/Page4Components/Favorites';
import SignUp from './components/SignUp';

function App() {
  const user = useSelector(state => state.user)

  // This code sets up routing for different components based on the user's authentication status.
  // If the user is logged in (determined by the presence of their email in the Redux store),
  // they can access various pages such as Home, HomeP2, HomeP3, and Favorites.
  // If the user is not logged in, they are redirected to the SignIn page.
 
  return (  
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn  />} />
          <Route path="/components/SignUp" element={<SignUp />} />
          {user.email?<><Route path="/components/Home" element={<Home />} /> 
          <Route path="/components/Page2Components/HomeP2" element={<HomeP2  />} />
          <Route path="/components/Page3Components/HomeP3" element={<HomeP3 />} />
          <Route path="/components/Favorites" element={<Favorites />} /></> :
          <Route path='*' element={<SignIn />}  />  }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
