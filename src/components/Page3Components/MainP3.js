import React, { useState } from 'react';
import '../../style/cssP3.css';

// MainP3 component displays the main content of the page showing a specific recipe.
// It includes the recipe instructions, a button to navigate to the next step,
// and a list of ingredients.

export default function MainP3(props) {
    const { specificIngredient } = props;
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    // the handleNextStep function is responsible for incrementing the currentStepIndex state variable,
    // allowing the user to navigate to the next step in the recipe instructions
    // when the button associated with this function is clicked. However,
    // it checks whether there are more steps available to navigate to before updating the state
    // to avoid going beyond the total number of steps.
    const handleNextStep = () => {
        if (currentStepIndex < specificIngredient.analyzedInstructions[0].steps.length - 1) {
            setCurrentStepIndex((prevIndex) => prevIndex + 1);
        }
    };

    return (
    <div>
        <div className="Main_P3_container">
            {props.currntStep && (
                <div style={{ display: "flex", flexDirection: "column", marginTop: "30px", height: "170px" , overflowY: "auto" }}>
                    {props.currntStep[0].steps && (
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <p>{props.currntStep[0].steps[currentStepIndex].step}</p>
                        </div>
                    )}
                </div>
                )}
    
            {/* Button to navigate to the next step */}
            <button onClick={handleNextStep} disabled={currentStepIndex === specificIngredient.analyzedInstructions[0].steps.length - 1}>
                Next Step
            </button>
            <div className='ingredients_container'>
                <h2>Ingredients:</h2>
                {/* Displaying list of ingredients */}
                {props.specificIngredient.ingredients && props.specificIngredient.ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <p>{ingredient.name} - ({ingredient.amount.value} {ingredient.amount.unit})</p>
                    </div>
                ))}
                <div className='grey_line_p3'></div>
            </div>
        </div>
    </div>
    );
}
