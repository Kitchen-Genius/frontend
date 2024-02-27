import { useEffect, useState } from 'react';
import my_Images from '../../my_Images/kitchengenius.png';
import axios from 'axios';
import '../../style/cssP2.css';
import AlertDialog from './AlertDialog';
import AlertDialog2 from './AlertDialog2';


export default function HeaderP2(props) {
    const [Intolerances, SetIntolerances] = useState([]);
    const [Ingredients, SetIngredients] = useState([]);
    const [Time, SetTime] = useState([]);
  
    useEffect(() => {
      const receiveIntoFunc = () => {
        // Check if props.ingredientList is defined and not null
        if (props.ingredientList && typeof props.ingredientList === 'object') {
          const intolerances = Object.keys(props.ingredientList).filter(
            (ingredient) =>
              [
                'High_protein',
                'Low_calories',
                'Vegetarian',
                'Lactose_free',
                'Gluten_free',
                'Nut_free',
              ].includes(ingredient)
          );
    
          SetIntolerances(intolerances);
    
          const ingredients = Object.entries(props.ingredientList)
            .filter(([, value]) => typeof value === 'object')
            .map(([key]) => key);
    
          SetIngredients(ingredients);
        }
      };
    
      const Time =
        props.ingredientList && props.ingredientList.hasOwnProperty('CookingTime')
          ? props.ingredientList.CookingTime
          : null;
    
      if (Time !== null) {
        SetTime(Time);
      }
    
      receiveIntoFunc();
    }, [props.ingredientList]);
  
    const buttonStyle = {
      width: '90px',
      height: '20px',
      margin: '2px 5px',
      padding: '6px 10px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      border: 'none',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(240, 240, 240, 1)', // Adjust the background color as needed
      color: '#000', // Adjust the text color as needed
    };

    const buttonLevelStyle = {
      margin: '2px 5px',
      padding: '6px 10px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      border: 'none',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgba(240, 240, 240, 1)', // Adjust the background color as needed
      color: '#000', // Adjust the text color as needed


    };
  
    return (
      <>
        <div className="kitchenIMG">
          <img src={my_Images} alt="kitchengenius" />
        </div>
        <div className="Rectangle_gray_p2">
          <div className="Bell_p2"></div>
          <div className="Steven_square_p1">
            <p className="Hader_text_p1">Hi, Steve</p>
            <div className="Steven_pic_p1"></div>
          </div>
        </div>
        <div className="TextP2">
          <p>All the recipes - just for you</p>
        </div>
        <div className="square_ingredients_p2">
          <div className="Intolerances_p2">
            <h3>Intolerances: </h3>
            {Intolerances.slice(0, 2).map((intolerance, index) => (
              <p key={index} style={buttonStyle}>
                {intolerance}
              </p>
            ))}

        {Intolerances.length > 2 && (
      <button className='tree_dots'> <AlertDialog2 Intolerances={Intolerances}/></button>
    )}
          </div>
          <div className="Ingredients_p2">
          <h3>Ingredients: </h3>
          {Ingredients.slice(0, 2).map((ingredient, index) => (
           <p key={index} style={buttonStyle}>
              {ingredient}
             </p>
           ))}
    
    {Ingredients.length > 2 && (
      <button className='tree_dots'> <AlertDialog ingredients={Ingredients}/></button>
    )}
           </div>
          <div className="Level_p2"> 
          <h3>time: </h3>
              <p style={buttonLevelStyle}>
                {Time}
              </p>
             </div>
        </div>
      </>
    );
  }
  