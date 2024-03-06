import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Store';
import { Favorite } from '@mui/icons-material';
import axios from 'axios';
import '../../style/cssP2.css';

export default function MainP2(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [selector, setSelector] = useState([]);
  const [recipeJson, setRecipeJson] = useState([]);
  const navigate = useNavigate();
  console.log(props.myJson)

  useEffect(() => {
    setRecipeJson(props.myJson || []);
  }, [props.myJson]);

  useEffect(() => {
    
    setRecipeJson(props.myJson || []);
  }, [props.myJson]);

  useEffect(() => {
    const recipeCards = recipeJson.map((value, index) => (
      <React.Fragment key={value.id}>
        <div className='leftContainer'>
          <h1 className='subTitle'>{value.title}</h1>
          <div className='text_container'>
            <p className='time'>time: {value.readyInMinutes}</p>
            <p className='calories'>calories: {value.Calories}</p>
            <p className='servings'>servings: {value.servings}</p>
            <div className='buttons_container'>
              <button className='start_button' onClick={() => recipeSelected(value)}>
                Start
              </button>
              <button className='like_button' onClick={() => toggleLike(value.id)}>
                <Favorite fontSize="small" color={likedRecipes.includes(value.id) ? 'error' : 'inherit'} />
              </button>
            </div>
          </div>
        </div>
        <div className='rightContainer'>
          <div className='recPic'>
            <img src={value.image} alt="img" />
          </div>
        </div>
        {index < recipeJson.length - 1 && <div className='line' />}
      </React.Fragment>
    ));

    setSelector(recipeCards);
  }, [recipeJson]);

  const sendLikeToServer = async (data) => {
    try {
      const response = await axios.post('YOUR_SERVER_API_ENDPOINT', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Like sent to server successfully');
      } else {
        console.error('Failed to send like to server');
      }
    } catch (error) {
      console.error('Error sending like to server:', error);
    }
  };

  function recipeSelected(value) {
    navigate('/components/Page3Components/HomeP3', { state: { value, ingredientList: props.ingredientList, recipeJson: recipeJson } });

  }

  async function toggleLike(recipeId) {
    const updatedLikedRecipes = prevLikedRecipes =>
      prevLikedRecipes.includes(recipeId)
        ? prevLikedRecipes.filter(id => id !== recipeId)
        : [...prevLikedRecipes, recipeId];

    setLikedRecipes(updatedLikedRecipes);

    if (user.recipeId === recipeId && user.liked === true) {
      dispatch(setUser({ ...user, liked: false }));
      console.log('both equal - liked set to false');
    } else if (user.recipeId === recipeId) {
      dispatch(setUser({ ...user, liked: true }));
      console.log('only recipeId is equal - liked set to true');
    } else {
      dispatch(setUser({ ...user, recipeId, liked: true }));
      console.log('different recipeId - new recipeId and liked set to true');
    }

    sendLikeToServer({ recipeId: user.recipeId, id: user.id, liked: user.liked });
  }

  return <div className='recPList'>{selector}</div>;
}
