import { useEffect, useState } from 'react';
import ToggleButtons from './ToggleButtons';
import DiscreteSlider from './DiscreteSlider';
import ToggleButtons2 from '../ToggleButtons2';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import csv_files from "../../csv_files/top-1k-ingredients.csv"
import '../../style/cssP1.css';
import { useDispatch, useSelector } from 'react-redux';
import {  setInfor } from '../Store';
var csvList = [];


// This component serves as the main interface for users to input ingredients,
// select meal types, and specify cooking time preferences to search for recipes.
// It includes functionalities such as adding ingredients from a list,
// selecting meal types using toggle buttons, setting cooking time using a slider,
// and selecting additional dietary preferences.
// Upon submission, it sends the selected criteria to the server to retrieve relevant recipes
// and navigates the user to the next page to display the results.
export default function MainP1() {
  // State variables
  const [ingredient, setIngredient] = useState('');
  const [ingredientList, setIngredientList] = useState({});
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const infor = useSelector((state) => state.user.infor);

  // Fetch CSV file and set ingredient options
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csv_files);
        const text = await response.text();

        Papa.parse(text, {
          delimiter: ';',
          header: false,
          complete: (result) => {
            setIngredientOptions(result.data.map((row) => row[0].toLowerCase()));
            csvList = result.data.map((row) => [row[0].toLowerCase(), row[1]]);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          },
        });
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };

    fetchData();
  }, []);

  // Render ingredients list
  const renderIngredients = () => {
    const ingredientsArray = ingredientList.ingredients || [];
     return (
      <div>
        <ul>
          {ingredientsArray
            .slice(-5)
            .map((ingredient, index) => (
              <li className="MainDisplayedIngredents" key={index}>
                {ingredient}
              </li>
            ))}
        </ul>
      </div>
    );
  };

  // Handle input change for ingredient
  const handleInputChange = (event) => {
    setIngredient(event.target.value.toLowerCase());
  };

  // Handle submission of ingredient
  const handleSubmit = (event) => {
    event.preventDefault();
    if (ingredient.length === 0) {
      alert("Error: empty input is not allowed");
      return;
    }

    if (!ingredientOptions.includes(ingredient)) {
      alert('Error: Ingredient not from the list');
      return;
    }

    if (ingredientList.ingredients && ingredientList.ingredients.includes(ingredient)) {
      alert('This ingredient is already added');
      setIngredient('')
      return;
    }

    setIngredientList((prevList) => ({
      ...prevList,
      ingredients: [...(prevList.ingredients || []), ingredient],
    }));

    console.log(ingredientList);
    setIngredient('');
  };

  // Submit search with selected ingredients and criteria
  const submitSearch = async () => {
    console.log(ingredientList)
    if (!ingredientList.hasOwnProperty('ingredients')) {
      alert('Please insert ingredients');
      return;
    }
    if (!ingredientList.hasOwnProperty('breakfast', 'lunch', 'dinner', 'dessert')) {
      alert('you must choose meal type');
      return;
    }

    if (!ingredientList.hasOwnProperty('CookingTime')) {
      alert('please select CookingTime');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://backend-wp4c.onrender.com/recipes/search", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredientList),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');

      }

      const data = await response.json();
      console.log('Server response:', data);
      dispatch(setInfor({ ...infor, ingredients: ingredientList, json: data })); // this is a global like user and what it does is saving information that will be valuable later on

      navigate('/components/Page2Components/HomeP2', { state: { ingredientList, data } });
    } catch (error) {
      console.error('Error during fetch operation:', error);
      
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className={`Main ${loading ? 'grayed-out' : ''}`}>
      {loading && (   // in here we wait for the server to respond
        <div className="loading-overlay">
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
            <div>Please wait...</div>
          </div>
        </div>
      )}
      <h1 className="Main_upper_text">What Would You Like To Cook?</h1>
      <p className='line1_P1'></p>
      <h5 className="ingredients">ingredients: </h5>
      <div className="ingredients_box">
        <form className="ingredients_box_form" onSubmit={handleSubmit}>  
          <label>
            <input
              type="text"
              value={ingredient}
              onChange={handleInputChange}
              placeholder="type here"
              list="ingredientsList"
            />
            <datalist id="ingredientsList" max="3">    
              {ingredientOptions.map((option, index) => (   // this function will show all the selecetd ingredients
                <option key={index} value={option} />
              ))}
            </datalist>
          </label>
          <label>
            <button type="submit">Add Here</button>
          </label>
          {renderIngredients()}
        </form>
      </div>
      <p className='line1_P1'></p>
      <div className="Meal_select">
        <p>Meal Type</p>
        <div className="buttons">
          <ToggleButtons ingredientList={ingredientList} setIngredientList={setIngredientList} />
        </div>
      </div>
      <p className='line1Fixed_P1'></p>
      <div className="Skill_bar">
        <p>Avaliable Cooking Time</p>
        <DiscreteSlider ingredientList={ingredientList} setIngredientList={setIngredientList} />
      </div>
      <div className="small_lines_containerP1">
        <h5 className='small_linesP1'>
          <p>5m</p>
        </h5>
        <h5 className='small_linesP1'>
          <p style={{ left: '75px' }}>15m</p>
        </h5>
        <h5 className='small_linesP1' style={{ marginRight: '1px' }}>
          <p style={{ left: '108px' }}>25m</p>
        </h5>
        <h5 className='small_linesP1' style={{ marginRight: '1px' }}>
          <p style={{ left: '140px' }}>30m</p>
        </h5>
        <h5 className='small_linesP1' style={{ marginRight: '1px' }}>
          <p style={{ left: '175.5px' }}>1h</p>
        </h5>
        <h5 className='small_linesP1' style={{ marginRight: '1px' }}>
          <p style={{ left: '208.5px' }}>2h</p>
        </h5>
        <h5 className='small_linesP1' style={{ marginRight: '1.5px' }}>
          <p style={{ left: '241.5px' }}>3h</p>
        </h5>
        <h5 className='small_linesP1' style={{ marginRight: '1px' }}>
          <p style={{ left: '275.5px' }}>4h</p>
        </h5>
        <h5 className='small_linesP1'>
          <p style={{ left: '309px' }}>5h</p>
        </h5>
        <h5 className='small_linesP1'>
          <p style={{ left: '340.5px' }}>6h</p>
        </h5>
      </div>
      <div className="Any_special">
        <div className="ToggleButtons2">
          <ToggleButtons2 ingredientList={ingredientList} setIngredientList={setIngredientList} />
        </div>
        <div className='line1_P1'></div>
        <button className="finalSubmit" onClick={submitSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
