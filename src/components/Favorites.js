import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../components/Store';
import { useState } from 'react';
import axios from 'axios';
import '../style/cssP1.css';

export default function Favorites() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // State to hold the fetched favorites data
  const [favoritesData, setFavoritesData] = useState([]);

  useEffect(() => {
    const fetchFavoritesData = async () => {
      try {
        // Replace 'favorites-endpoint' with the actual endpoint for fetching favorites data
        const response = await axios.post('YOUR_FAVORITES_ENDPOINT', {
          user_id: user.user_id,
        });

        // Set the fetched favorites data to the state
        setFavoritesData(response.data);
      } catch (error) {
        console.error('Error fetching favorites data:', error);
      }
    };

    fetchFavoritesData();
  }, [user.user_id]); // Include user.user_id in the dependency array

  return (
    <div className="favorites">
      <h1>Favorites:</h1>
      {user.liked === false ? (
        <h1>Your favorites are empty</h1>
      ) : (
        <>
          <div className="favorites_container">
            {/* Render titles from the fetched favorites data */}
            {favoritesData.map((dataItem) => (
              <h1 key={dataItem.id}>{dataItem.title}</h1>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
