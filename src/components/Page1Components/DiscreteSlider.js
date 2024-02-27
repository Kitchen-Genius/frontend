import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const DiscreteSlider = (props) => {
  const valueLabelFormat = (value) => {
    if (value <= 5) {
        return '5 Min';

    } else if (value <= 10) {
        return '15 Min';

    } else if (value <= 15) {
        return '25 Min';
    }
      else if (value <= 20) {
        return '30 Min';
    }
      else if (value <= 25) {
        return '1H';
    }
      else if (value <= 30) {
        return '2H';
    }
      else if (value <= 35) {
        return '3H';
    }
      else if (value <= 40) {
        return '4H';
    }
      else if (value <= 45) {
        return '5H';
    }
      else if (value <= 50) {
       return '6H';
  }
  };

  const handleChange = (event, value) => {
    let CookingTime = [];

    if (value <= 5) {
      CookingTime = "5 Min";

    } else if (value <= 10) {
      CookingTime = "15 Min";
      
    } else if (value <= 15) {
      CookingTime = "25 Min";
    }
      else if (value <= 20) {
      CookingTime = "30 Min";
    }
      else if (value <= 25) {
      CookingTime = "1H";
    }
      else if (value <= 30) {
      CookingTime = "2H";
    }
      else if (value <= 35) {
      CookingTime = "3H";
    }
      else if (value <= 40) {
      CookingTime = "4H";
    }
      else if (value <= 45) {
      CookingTime = "5H";
    }
      else if (value <= 50) {
      CookingTime = "6H";
    }
    // Update the ingredient list using setIngredientList
    props.setIngredientList((prevList) => {
      const updatedList = {
        ...prevList,
        CookingTime
      };

      

      return updatedList;
    });
  };

  return (
    <Box sx={{ width: 300, height: 100 }}>
      <Slider
        sx={{
          marginLeft: '32px',
          height: 10
        }}
        aria-label="Temperature"
        defaultValue={30}
        valueLabelFormat={valueLabelFormat}
        valueLabelDisplay="auto"
        step={5}
        marks
        min={5}
        max={50}
        onChange={handleChange}
      />
    </Box>
  );
};

export default DiscreteSlider;
