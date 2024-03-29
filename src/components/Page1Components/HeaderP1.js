import { Button } from '@mui/material';
import my_Images from '../../my_Images/kitchengenius.png';
import '../../style/cssP1.css';
import { setUser } from '../Store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

// It includes a logout button, user information display, and an image.
// Upon clicking the logout button, the user's information is cleared from the Redux store using the setUser action.
// The user's name and profile picture are displayed based on the data fetched from the server that save on user in redux store.

export default function HeaderP1() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  

  useEffect(() => { // this useEffect is set the user information to useState hook
    setUserData(user);
  }, [user]);

  const handleLogout = () => {     // the handleLogout fuction is set the user to be empty and by that 
    // with other restrictions (i did in app.js component) it will log out 
    dispatch(setUser({}));
  };

  return (
    <>
      <Button sx={{ marginLeft: '320px' }} onClick={handleLogout}>
        Logout
      </Button>
      <div className='kitchenIMG'>
        <img src={my_Images} alt='kitchengenius' />
      </div>
      <div className='Rectangle_gray_p1'>
        <div className='Steven_square_p1'>
          <p className='Hader_text_p1'>Hi, {user.username}</p>
          <div className='Steven_pic_p1' style={{ backgroundImage: `url(${user.imgUrl}?raw=true)` }}>
          </div>
        </div>
      </div>
    </>
  );
}
