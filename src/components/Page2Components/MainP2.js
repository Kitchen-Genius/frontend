import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Store';
import { Favorite } from '@mui/icons-material';
import { Snackbar } from '@mui/material'; 
import axios from 'axios';
import '../../style/cssP2.css';

// MainP2 component renders recipe cards based on fetched data and handles user interactions such as
// liking a recipe.
// It displays recipe information including title, cooking time, calories, servings, and an image.
// Users can like a recipe, and a Snackbar notifies them that the recipe is been liked.

export default function MainP2(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [selector, setSelector] = useState([]);
  const [recipeJson, setRecipeJson] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to control the visibility of Snackbar
  const navigate = useNavigate();
  const Json = props.myJson;
 
  useEffect(() => { // this use effect is saving the recived recipes in use state hook
    setRecipeJson(Json || []);
  }, [Json]);

  useEffect(() => { // this use effect renders all the recipes that we recived from the server 
    const putRecipeCard = () => {
      setSelector((prevSelector) =>
        recipeJson.map((value, index) => (
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
                  <button className='like_button' onClick={() => handleLikeClick(value.id)}> 
                    <Favorite
                      fontSize="small"
                      color={likedRecipes.includes(value.id) ? 'error' : 'inherit'}
                    />
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
        ))
      );
    };

    putRecipeCard();
  }, [recipeJson]);

  const sendLikeToServer = async (data) => {
    try {
      const response = await axios.post('https://backend-wp4c.onrender.com/users/favorites', data, {
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
    navigate('/components/Page3Components/HomeP3', { state: { value, ingredientList: props.ingredientList , Json} });
  }

  async function handleLikeClick(recipeId) { // Renamed function to handleLikeClick
    setLikedRecipes((prevLikedRecipes) =>
      prevLikedRecipes.includes(recipeId)
        ? prevLikedRecipes.filter((id) => id !== recipeId)
        : [...prevLikedRecipes, recipeId]
    );

    if (user.recipeId === recipeId && user.liked === true) {
      dispatch(setUser({ ...user, liked: false }));
      console.log('both equal - liked set to false');
    } else if (user.recipeId === recipeId) {
      dispatch(setUser({ ...user, liked: true }));
      console.log('only recipeId is equal - liked set to true');
    } else {
      dispatch(setUser({ ...user, recipeId: recipeId, liked: true }));
      console.log('different recipeId - new recipeId and liked set to true');
    }

    setOpenSnackbar(true); // Open Snackbar when like is clicked
    sendLikeToServer({ recipe_id: recipeId, user_id: user.id, like: true });
  }

  return (
    <div className='recPList'>
      {recipeJson.length > 0 && selector}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Hide after 3 seconds
        onClose={() => setOpenSnackbar(false)} // Close Snackbar on user action
        message="The recipe has been liked" // Snackbar message
      />
    </div>
  );
}
