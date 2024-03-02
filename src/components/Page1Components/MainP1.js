import { useEffect, useState } from 'react';
import ToggleButtons from './ToggleButtons';
import DiscreteSlider from './DiscreteSlider';
import ToggleButtons2 from '../ToggleButtons2';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import csv_files from "../../csv_files/top-1k-ingredients.csv"
import '../../style/cssP1.css';


// var newIdCounter = 0;
var csvList = [];

export default function MainP1() {
  const [ingredient, setIngredient] = useState('');
  const [ingredientList, setIngredientList] = useState({});
  const [specialRequests, setSpecialRequests] = useState('');
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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


  const createJsonFile = () => {
    const sampleIngredientList = Object.fromEntries(
      Object.entries(ingredientList).slice(0, 10)
    );

    // Example: create a Blob from the first 10 ingredients
    const jsonBlob = new Blob([JSON.stringify(sampleIngredientList)], {
      type: 'application/json',
    });

    // Example: save the Blob as a JSON file
    saveJsonToFile(jsonBlob, 'sample_ingredient_list.json');
  };

  const saveJsonToFile = (jsonBlob, filename) => {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
  
    const url = window.URL.createObjectURL(jsonBlob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderIngredients = () => {
    return (
      <div>
        <ul>
          {Object.keys(ingredientList)
            .slice(-5)
            .map((ingredientName, index) =>
              ingredientName !== 'CookingTime' &&
              ingredientName !== 'dessert' &&
              ingredientName !== 'dinner' &&
              ingredientName !== 'lunch' &&
              ingredientName !== 'breakfast' &&
              ingredientName !== 'specialRequests' &&
              ingredientName !== 'veryHealthy' &&
              ingredientName !== 'Low_calories' &&
              ingredientName !== 'dairyFree' &&
              ingredientName !== 'Gluten_free' &&
              ingredientName !== 'Vegetarian' &&
              ingredientName !== 'High_protein' ? (
                <li className="MainDisplayedIngredents" key={index}>
                  {ingredientName}
                </li>
              ) : null
          )}
        </ul>
      </div>
    );
  };

  const handleSpecialRequestsChange = (event) => {
    setSpecialRequests(event.target.value);
  };

  const handleSpecialRequestsSubmit = (event) => {
    event.preventDefault();
    setIngredientList((ingredientList) => {
      const updatedList = {
        ...ingredientList,
        specialRequests,
      };
      setSpecialRequests('');
      return updatedList;
    });
  };

  const handleInputChange = (event) => {
    setIngredient(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ingredient.length === 0) {
      alert("Error: It's an empty input");
      return;
    }

    if (!ingredientOptions.includes(ingredient)) {
      console.log('Error: Ingredient not found in CSV');
      return;
    }

    if (ingredientList.hasOwnProperty(ingredient)) {
      console.log('This ingredient is already added');
      return;
    }

    setIngredientList((prevList) => ({
      ...prevList,
      [ingredient]: { id: csvList.find((item) => item[0] === ingredient)[1], name: ingredient },
    }));

    console.log(ingredientList);
    setIngredient('');
  };

  
  const submitSearch = () => {
    if (Object.keys(ingredientList).length === 0) {
      alert('Please insert ingredients and choose from the menu');
      return;
    }
  
    let apiBaseUrl;
  
    apiBaseUrl = "https://frontend-41ag.onrender.com";
  
    const serverEndpoint = `${apiBaseUrl}/api/process-recipe-criteria`;
    setLoading(true);
  
    fetch(serverEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredientList),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('Server response:', response);
        return response.json();
      })
      .then((data) => {
        console.log('Server response:', data);
        // Navigate to HomeP2 with both data and ingredientList
        navigate("/components/Page2Components/HomeP2", { state: { data, ingredientList } });
      })
      .catch((error) => {
        console.error('Error during fetch operation:', error);
        // Handle error scenarios here
      })
      .finally(() => {
        setLoading(false);
      });
  };
    

  return (
    <div className={`Main ${loading ? 'grayed-out' : ''}`}>
    {loading && (
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
              list="ingredientsList"
              type="text"
              value={ingredient}
              onChange={handleInputChange}
              placeholder="type here"
            ></input>
            <datalist id="ingredientsList">
              {ingredientOptions.map((option, index) => (
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
        <p style={{left: '75px'}}>15m</p>
        </h5>
        <h5 className='small_linesP1' style={{ marginRight: '1px' }}>
        <p style={{left: '108px'}}>25m</p>
        </h5>
        <h5 className='small_linesP1' style={{ marginRight: '1px' }}>
        <p style={{left: '140px'}}>30m</p>
        </h5>
        <h5 className='small_linesP1' style={{ marginRight: '1px' }}>
        <p style={{left: '175.5px'}}>1h</p>
        </h5>
        <h5 className='small_linesP1' style={{ marginRight: '1px' }}>
        <p style={{left: '208.5px'}}>2h</p>
        </h5>
        <h5 className='small_linesP1' style={{ marginRight: '1.5px' }}>
        <p style={{left: '241.5px'}}>3h</p>
        </h5>
        <h5 className='small_linesP1' style={{ marginRight: '1px' }}>
        <p style={{left: '275.5px'}}>4h</p>
        </h5>
        <h5 className='small_linesP1'>
        <p style={{left: '309px'}}>5h</p>
        </h5>
        <h5 className='small_linesP1'>
        <p style={{left: '340.5px'}}>6h</p>
        </h5>
        </div>
      <div className="Any_special">
        <p>Any special requests?</p>
        <form onSubmit={handleSpecialRequestsSubmit}>
          <input
            type="text"
            value={specialRequests}
            onChange={handleSpecialRequestsChange}
            placeholder="type here..."
          ></input>
          <label>
            <button type="submit">click</button>
          </label>
        </form>
        <div className="ToggleButtons2">
          <ToggleButtons2 ingredientList={ingredientList} setIngredientList={setIngredientList} />
        </div>
        <button className="finalSubmit" onClick={submitSearch}>
          Search
        </button>
      </div>
      <button onClick={createJsonFile}>Create JSON File</button>
    </div>
  );
}
