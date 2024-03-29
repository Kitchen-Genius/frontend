import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, Favorite} from '@mui/icons-material';
import '../../style/cssP1.css';
import { useSelector } from 'react-redux';

export default function FooterP2(props) {
  const user = useSelector((state) => state.user);

  return (
    <div className="FooterP2">
      <Link to="/components/Home">
        <div className="icon" >
          <Home fontSize="small" color="primary" />
        </div>
      </Link>
       <Link  to="/components/Page2Components/HomeP2">     
        <div  className="icon">
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
