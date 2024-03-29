import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import '../../style/cssP1.css';
import RecipeReviewCard from '../RecipeReviewCard';

// the Favorites component effectively manages the fetching and rendering of a user's favorite recipes,
//  providing a user-friendly interface for viewing and accessing their preferred dishes.



export default function Favorites() {
  const user = useSelector((state) => state.user);

  // State to hold the fetched favorites data
  const [favoritesData, setFavoritesData] = useState([]);

  useEffect(() => {
    const fetchFavoritesData = async () => { // we sending to the server the user id and recives all the liked recipes from the data base
      try {
        const response = await axios.post('https://backend-wp4c.onrender.com/users/favorites/list', {
          user_id: user.id,
        });

        // Set the fetched favorites data to the state
        setFavoritesData(response.data.favorites);
        
      } catch (error) {
        console.error('Error fetching favorites data:', error);
      }
    };

    fetchFavoritesData();
  }, [user.id]); // Include user.user_id in the dependency array

  return (
    <div className="favorites">
      <h1>Favorites:</h1>
      <div className="favorites_container">
        {favoritesData.map((dataItem) => (
          <RecipeReviewCard key={dataItem.id} recipeData={dataItem} />
        ))}
      </div>
    </div>
  );
}
