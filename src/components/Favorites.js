import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../components/Store';
import { useState } from 'react';
import axios from 'axios';
import '../style/cssP1.css';

export default function Favorites() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // State to hold the fetched data
  const [favoritesData, setFavoritesData] = useState([]);

  useEffect(() => {
    // צריך לקבל רשימת לייקים של היוזר
    const fetchData = async () => {
      try {
        const response = await axios.get('YOUR_SERVER_API_ENDPOINT');
        // Set the fetched data to the state
        setFavoritesData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetch data function when the component mounts
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <div className="favorites">
      <h1>Favorites:</h1>
      {user.liked === false ? (
        <h1>Your favorites is empty</h1>
      ) : (
        <>
          
          <div className="favorites_container">
            {/* Render titles from the fetched data */}
            {favoritesData.map((dataItem) => (
              <h1 key={dataItem.id}>{dataItem.title}</h1>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
