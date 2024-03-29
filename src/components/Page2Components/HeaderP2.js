import React, { useEffect, useState } from 'react';
import my_Images from '../../my_Images/kitchengenius.png';
import AlertDialog from './AlertDialog';
import AlertDialog2 from './AlertDialog2';
import '../../style/cssP2.css';
import { useDispatch, useSelector } from 'react-redux';

// This HeaderP2 component is responsible for displaying user information and selected ingredients,
// intolerances, and cooking time. It fetches this data from props and renders it accordingly.
// The component includes user profile information such as the user's name and profile picture,
// as well as a visual representation of selected intolerances, ingredients, and cooking time.
// If there are more than two intolerances or ingredients selected,
// it provides a button to view all of them. Additionally,
// it features an image of a kitchen genius icon.
export default function HeaderP2(props) {
  const [Intolerances, setIntolerances] = useState([]);
  const [Ingredients, setIngredients] = useState([]);
  const [ShowTime, setTime] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const receiveIntoFunc = () => {
      if (props.ingredientList && typeof props.ingredientList === 'object') {
        const intolerances = Object.entries(props.ingredientList)
          .filter(([ingredient, value]) =>
            ['High_protein', 'Low_calories', 'Vegetarian', 'dairyFree', 'Gluten_free', 'veryHealthy'].includes(ingredient) && value
          )
          .map(([key]) => key);
        setIntolerances(intolerances);
        const ingredients = props.ingredientList.ingredients || [];
        setIngredients(ingredients);
      }
    };

    const cookingTime = props.ingredientList?.ShowTime;
    if (ShowTime !== undefined) {
      setTime(cookingTime);
    }

    receiveIntoFunc();
  }, [props.ingredientList]);

  return (
    <>
      <div className="kitchenIMG">
        <img src={my_Images} alt="kitchengenius" />
      </div>
      <div className="Rectangle_gray_p2">
        <div className="Bell_p2"></div>
        <div className="Steven_square_p1">
          <p className="Hader_text_p1">Hi, Steve</p>
          <div className="Steven_pic_p1" style={{ backgroundImage: `url(${user.imgUrl}?raw=true)` }} >
          </div>
        </div>
      </div>
      <div className="TextP2">
        <p>All the recipes - just for you</p>
      </div>
      <div className="square_ingredients_p2">
        <div className="Intolerances_p2">
          <h3>Intolerances: </h3>
          {Intolerances.slice(0, 2).map((intolerance, index) => (
            <p key={index} style={{ ...buttonStyle, margin: '2px 5px' }}>
              {intolerance}
            </p>
          ))}

          {Intolerances.length > 2 && (
            <button className="tree_dots">
              <AlertDialog2 Intolerances={Intolerances} />
            </button>
          )}
        </div>
        <div className="Ingredients_p2">
          <h3>Ingredients: </h3>
          {Ingredients.slice(0, 2).map((ingredient, index) => (
            <p key={index} style={{ ...buttonStyle, margin: '2px 5px' }}>
              {ingredient}
            </p>
          ))}

          {Ingredients.length > 2 && (
            <button className="tree_dots">
              <AlertDialog ingredients={Ingredients} />
            </button>
          )}
        </div>
        <div className="Level_p2">
          <h3>time: </h3>
          {ShowTime !== null && (
            <p style={{ ...buttonLevelStyle, margin: '2px 5px' }}>{ShowTime}</p>
          )}
        </div>
        <div className='line_header'></div>
      </div>
    </>
  );
}

const buttonStyle = {
  height: '20px',
  padding: '6px 10px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  border: 'none',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(240, 240, 240, 1)',
  color: '#000',
};

const buttonLevelStyle = {
  ...buttonStyle,
  backgroundColor: 'rgba(240, 240, 240, 1)',
  margin: '2px 5px',
};
