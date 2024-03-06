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
    const fetchUserData = async () => {
      try {
        // Replace 'user-information-endpoint' with the actual endpoint for user information
        // אני שולח את המייל וצריך לקבל את כל הפרטים של היוזר
        const response = await axios.post('user-information-endpoint', {
          email: user.email,
        });

        const userData = response.data;

        // Assuming userData contains fields like username, imgUrl, id, etc.
        // Modify the setUser dispatch accordingly based on your user data structure
        dispatch(setUser({
          username: userData.username,
          imgUrl: userData.img,
          id: userData.user_id,
          // Add other fields as needed
        }));

        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [dispatch, user.email]);

  return (
    <>
      <Button sx={{ marginLeft: '320px' }} onClick={() => dispatch(setUser({}))}>
        Logout
      </Button>
      <div className='kitchenIMG'>
        <img src={my_Images} alt='kitchengenius' />
      </div>
      <div className='Rectangle_gray_p1'>
        <div className='Steven_square_p1'>
          <p className='Hader_text_p1'>Hi, {userData?.username || 'Guest'}</p>
          <div className='Steven_pic_p1'>
            {/* Display user profile picture */}
            {userData?.imgUrl && <img src={userData.imgUrl} alt='user-pic' />}
          </div>
        </div>
      </div>
    </>
  );
}
