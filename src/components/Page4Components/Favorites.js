import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../Store';
import { useState } from 'react';
import axios from 'axios';
import '../../style/cssP1.css';
import RecipeReviewCard from '../RecipeReviewCard';
import myJson from "../../csv_files/None_processed_recipes.json"
import FooterP2 from "../Page2Components/FooterP2"

export default function Favorites() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const infor = useSelector((state) => state.infor);
  console.log(infor)


  // Use the imported JSON directly
  const Json = myJson;

  return (
    <>
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
    </>
  );
}
