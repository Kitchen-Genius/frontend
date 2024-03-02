import React, { useEffect, useState } from 'react';
import Json from '../../csv_files/None_processed_recipes.json';
import { useNavigate } from 'react-router-dom';

export default function MainP2(props) {
  const [selector, setSelector] = useState([]);
  const [recipeJson, setRecipeJson] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const timeOptions = [25, 30, 40, 50];
  const navigate = useNavigate();

  const getRandomTime = () => {
    const randomIndex = Math.floor(Math.random() * timeOptions.length);
    return timeOptions[randomIndex];
  };

  useEffect(() => {
    setRecipeJson(Json);

    const putRecipeCard = () => {
      Object.entries(recipeJson).forEach(([key, value]) => {
        setSelector((prevSelector) => [
          ...prevSelector,
          <>
            <div key={recipeJson.id} className='leftContainer'>
              <h1 className='subTitle'>{value.title}</h1>
              <div className='text_container'>
                <p className='time'>time: {getRandomTime()}</p>
                <p className='difficulty'></p>
                <button className='start_button' onClick={() => recipeSelected(value)}>
                  Start
                </button>
                <button className={likedRecipes.includes(value.id) ? 'like_button liked' : 'like_button'} onClick={() => toggleLike(value.id)}>
                  Like
                </button>
              </div>
            </div>
            <div className='rightContainer'>
              <div className='recPic'>
                <img src={value.image} alt="img" />
              </div>
            </div>
          </>
        ]);
      });
    };

    putRecipeCard();
  }, [recipeJson]);

  useEffect(() => {
    console.log('Liked recipes:', likedRecipes);
  }, [likedRecipes]);

  function recipeSelected(value) {
    navigate("/components/Page3Components/HomeP3", { state: { value, ingredientList: props.ingredientList } });
  }

  function toggleLike(recipeId) {
    setLikedRecipes((prevLikedRecipes) =>
      prevLikedRecipes.includes(recipeId)
        ? prevLikedRecipes.filter((id) => id !== recipeId)
        : [...prevLikedRecipes, recipeId]
    );
  }

  return <div className='recPList'>{selector}</div>;
}
