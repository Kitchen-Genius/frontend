import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../components/Store';
import { useState } from 'react';
import axios from 'axios';
import '../style/cssP1.css';
import RecipeReviewCard from './RecipeReviewCard';

export default function Favorites() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // State to hold the fetched favorites data
  const [favoritesData, setFavoritesData] = useState([]);

  useEffect(() => {
    const fetchFavoritesData = async () => {
      try {
        const response = await axios.post('YOUR_FAVORITES_ENDPOINT', {
          user_id: user.id,
        });

        // Set the fetched favorites data to the state
        setFavoritesData(response.data);
      } catch (error) {
        console.error('Error fetching favorites data:', error);
      }
    };

    fetchFavoritesData();
  }, [user.id]); // Include user.user_id in the dependency array

  return (
    <div className="favorites">
      <h1>Favorites:</h1>
      {user.liked === false ? (
        <h1>Your favorites are empty</h1>
      ) : (
        <div className="favorites_container">
          {favoritesData.map((dataItem) => (
            <RecipeReviewCard key={dataItem.id} recipeData={dataItem} />
          ))}
        </div>
      )}
    </div>
  );
}