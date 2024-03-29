import React, { useState } from 'react';
import '../../style/cssP3.css';

export default function MainP3(props) {
    const { specificIngredient } = props;
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const handleNextStep = () => {
        if (currentStepIndex < specificIngredient.analyzedInstructions[0].steps.length - 1) {
            setCurrentStepIndex(prevIndex => prevIndex + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prevIndex => prevIndex - 1);
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
    
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                    {/* Button to navigate to the previous step */}
                    <button onClick={handlePrevStep} disabled={currentStepIndex === 0}>
                        Previous Step
                    </button>
                    {/* Button to navigate to the next step */}
                    <button onClick={handleNextStep} disabled={currentStepIndex === specificIngredient.analyzedInstructions[0].steps.length - 1}>
                        Next Step
                    </button>
                </div>
                
                <div className='ingredients_container'>
                    <h2>Ingredients:</h2>
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
