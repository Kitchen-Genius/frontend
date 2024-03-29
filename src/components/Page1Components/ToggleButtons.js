import React, { useState, useEffect } from 'react';
import CoffeeTwoToneIcon from '@mui/icons-material/CoffeeTwoTone';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import CookieIcon from '@mui/icons-material/Cookie';
import '../../style/cssP1.css';

const ToggleButtons = (props) => {
  const buttonNames = ['breakfast', 'lunch', 'dinner', 'dessert'];
  const [selectedButton, setSelectedButton] = useState(null);

  // This component displays a set of toggle buttons
  // representing meal types (breakfast, lunch, dinner, dessert).
  // Users can click on these buttons to select or deselect a meal type.
  // Each button is accompanied by an icon representing its respective meal type.
  // When a button is clicked, it changes color to indicate selection,
  // and the corresponding value in the ingredient list state is updated accordingly.

  useEffect(() => {
    // Initialize ingredientList with all buttons set to false
    setSelectedButton([]);
    props.setIngredientList((prevList) => {
      const updatedList = {}
       
      Object.keys(buttonIcons).forEach((name) => {
        updatedList[name] = false;
      });
      return updatedList;
    });
  }, []); // Empty dependency array ensures the effect runs once on component mount
  
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);

    props.setIngredientList((prevList) => {
      const updatedList = {
        ...prevList,
      };

      // Set the clicked button to true, and all others to false
      buttonNames.forEach((name) => {
        updatedList[name] = name === buttonName;
      });

      return updatedList;
    });
  };
  
  const buttonStyle = {
    margin: '0 5px',
    padding: '6px 5px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    border: 'none',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  };

  const buttonIcons = {
    breakfast: <CoffeeMakerIcon />,
    lunch: <CoffeeTwoToneIcon />,
    dinner: <DinnerDiningIcon />,
    dessert: <CookieIcon />,
  };

  return (
    <div className='insideButtons'>
      {buttonNames.map((name) => (
        <button
          key={name}
          style={{
            ...buttonStyle,
            backgroundColor: selectedButton === name ? 'rgba(0, 114, 178, 1)' : props.ingredientList[name] ? 'rgba(0, 114, 178, 1)' : 'rgba(240, 240, 240, 1)',
          }}
          onClick={() => handleButtonClick(name)}
        >
          {buttonIcons[name]} {name.charAt(0).toUpperCase() + name.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ToggleButtons;
