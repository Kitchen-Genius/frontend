import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../components/Store';
import axios from 'axios';
import "../style/cssP1.css";

export default function Favorites() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await axios.get('YOUR_SERVER_API_ENDPOINT');
        // Handle the response data here
        console.log(response.data);
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
          {/* Your content for when user.liked is true */}
          <h1>Favorites:</h1>
          <div className="favorites_container">
            <h1>Favorites</h1>
            <h1>Favorites</h1>
            <h1>Favorites</h1>
            <h1>Favorites</h1>
            <h1>Favorites</h1>
          </div>
        </>
      )}
    </div>
  );
}
