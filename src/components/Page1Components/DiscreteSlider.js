import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
// this component allows users to select cooking times ranging from 5 minutes to 6 hours in 5-minute intervals.
// The selected cooking time is then passed to a parent component via the setIngredientList prop,
// which can be used for further processing or display.

const DiscreteSlider = (props) => {
  const valueLabelFormat = (value) => {
    if (value <= 5) {
      return '5 Min';
    } else if (value <= 10) {
      return '15 Min';
    } else if (value <= 15) {
      return '25 Min';
    } else if (value <= 20) {
      return '30 Min';
    } else if (value <= 25) {
      return '1H';
    } else if (value <= 30) {
      return '2H';
    } else if (value <= 35) {
      return '3H';
    } else if (value <= 40) {
      return '4H';
    } else if (value <= 45) {
      return '5H';
    } else if (value <= 50) {
      return '6H';
    }
  };

  const handleChange = (event, value) => {
    let CookingTime = [];
    let ShowTime = [];

    if (value <= 5) {
      CookingTime = '5';
      ShowTime = '5m';
    } else if (value <= 10) {
      CookingTime = '15';
      ShowTime = '15m';
    } else if (value <= 15) {
      CookingTime = '25';
      ShowTime = '25m';
    } else if (value <= 20) {
      CookingTime = '30';
      ShowTime = '30m';
    } else if (value <= 25) {
      CookingTime = '60';
      ShowTime = '1H';
    } else if (value <= 30) {
      CookingTime = '120';
      ShowTime = '2H';
    } else if (value <= 35) {
      CookingTime = '180';
      ShowTime = '3H';
    } else if (value <= 40) {
      CookingTime = '240';
      ShowTime = '4H';
    } else if (value <= 45) {
      CookingTime = '300';
      ShowTime = '5H';
    } else if (value <= 50) {
      CookingTime = '360';
      ShowTime = '6H';
    }

    props.setIngredientList((prevList) => {
      const updatedList = {
        ...prevList,
        CookingTime,
        ShowTime
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
        defaultValue={25}
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
