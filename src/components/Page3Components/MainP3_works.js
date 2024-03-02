import React, { useState } from 'react';

export default function MainP3(props) {
    const { specificIngredient } = props;
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const handleNextStep = () => {
        if (currentStepIndex < specificIngredient.analyzedInstructions[0].steps.length - 1) {
            setCurrentStepIndex((prevIndex) => prevIndex + 1);
        }
    };

    return (
        <div>
            <div className="lay_out">
                {props.currntStep && (
                    <div style={{ display: "flex", flexDirection: "column", marginTop: "30px" }}>
                        {props.currntStep[0].steps && (
                            <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
                                <input type="checkbox" />
                                <p>{props.currntStep[0].steps[currentStepIndex].step}</p>
                            </div>
                        )}
                    </div>
                )}

                <button onClick={handleNextStep} disabled={currentStepIndex === specificIngredient.analyzedInstructions[0].steps.length - 1}>
                    Next Step
                </button>
            </div>
        </div>
    );
}
