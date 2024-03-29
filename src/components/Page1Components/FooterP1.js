import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Favorite, Settings } from '@mui/icons-material';
import '../../style/cssP1.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Store';

export default function FooterP1(props) {
  // this is the navigation fotter it allows to change pages when clicking on the icons
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div className="FooterP1">
      <Link to="/components/Home">
        <div className="icon" >
          <Home fontSize="small" color="primary" />
        </div>
      </Link>
      <Link  to="/components/Page2Components/HomeP2">     
        <div className="icon">
          <Search fontSize="small" color="action" />
        </div>
    </Link>
     
      <Link to="/components/favorites">
        <div className="icon">
          <Favorite fontSize="small" color="error" />
        </div>
      </Link>
    </div>
  );
}
