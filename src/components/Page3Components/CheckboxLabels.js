import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect,useState } from'react';
export default function CheckboxLabels(props) {
    const [steps, setSteps] = useState([]);
    var instructionsArray = [];
    useEffect(() => {
        
      
        
        
        Object.entries(props.specificIngredient.analyzedInstructions).forEach(([key, value]) => {
            instructionsArray = value.steps;
            setSteps(...steps , instructionsArray)
            
        });

        Object.entries(instructionsArray).forEach(([key1, value1]) => {
            instructionsArray = value1
            
            setSteps(...steps , instructionsArray)
            
            
        });
        
    }, []);
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      <FormControlLabel required control={<Checkbox />} label="Required" />
      <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
    </FormGroup>
    
  );
}