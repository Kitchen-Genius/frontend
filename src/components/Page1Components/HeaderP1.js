import { Button } from '@mui/material';
import my_Images from '../../my_Images/kitchengenius.png';
import '../../style/cssP1.css';
import { setUser } from '../Store';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function HeaderP1() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  

  useEffect(() => {
    setUserData(user);
  }, [user]);

  console.log(user.imgUrl)

  const handleLogout = () => {
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
          <div className='Steven_pic_p1'>
            {/* Display user profile picture */}
            {user.imgUrl && <img src={user.imgUrl} alt='user-pic' />}
          </div>
        </div>
      </div>
    </>
  );
}
