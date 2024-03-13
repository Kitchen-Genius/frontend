import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../components/Store';
import axios from 'axios';
import '../style/cssP1.css';
import RecipeReviewCard from './RecipeReviewCard';
import myJson from "../csv_files/None_processed_recipes.json";

export default function Favorites() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        const response = await axios.post('YOUR_SERVER_ENDPOINT', { user_id: user.id });
        const jsonData = response.data; // Assuming server returns JSON data
        // Do something with the received JSON data
        console.log('JSON data received:', jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the user ID changes
    if (user.id) {
      fetchData();
    }
  }, [user.id]);

  // Use the imported JSON directly
  const Json = myJson;

  return (
    <div className="favorites">
      <h1>Favorites:</h1>
      {user.liked === false ? (
        <h1>Your favorites are empty</h1>
      ) : (
        <div className="favorites_container">
          {Json.map((dataItem) => (
            <RecipeReviewCard key={dataItem.id} recipeData={dataItem} />
          ))}
        </div>
      )}
    </div>
  );
}
