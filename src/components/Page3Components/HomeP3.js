import { useLocation } from 'react-router-dom';
import HeaderP3 from '../Page3Components/HeaderP3';
import MainP3 from './MainP3';
import { useState } from'react';


export default function HomeP3() {
    const location = useLocation();
    const specificIngredient = location.state ? location.state.value : null;
    const ingredientList = location.state? location.state.ingredientList : null;
    const analyzedInstructions = specificIngredient.analyzedInstructions;
    const recipeJson = location.state? location.state.recipeJson : null;

    return (
        <div className="lay_out">
           <HeaderP3 specificIngredient={specificIngredient} ingredientList={ingredientList} recipeJson={recipeJson} />
           <MainP3 specificIngredient={specificIngredient} currntStep={analyzedInstructions}  />

        </div>



    )
    


}