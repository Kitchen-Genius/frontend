
import React from 'react';
import '../../style/cssP3.css';
import my_Images from '../../my_Images/kitchengenius.png';
import { useNavigate } from 'react-router-dom';

export default function HeaderP3(props) {
    const navigate = useNavigate();
    const RnamePicStyle = {
        backgroundImage: `url(${props.specificIngredient.image})`,
        backgroundSize: 'cover',
        width: '393px',
        height: '61px',
        opacity: '0.7', 
    };

    function GoBack() {
        navigate("/components/Page2Components/HomeP2", { state: { ingredientList: props.ingredientList, recipeJson: props.recipeJson } });
    }

    return (
        <>
            <div className='kitchenIMG'>
                <img src={my_Images} alt="kitchengenius" />
            </div>
            <div className='Rectangle_gray_p3'>
                <div className='Steven_square_p3'>
                    <p className='Hader_text_p3'>Hi, Steve</p>
                    <div className='Steven_pic_p3'></div>
                </div>
            </div>
            <div className='RnamePic_p3' style={RnamePicStyle}></div>
            <div className='ArrowBack_p3' onClick={() => GoBack()}></div>
            <div className='Rname_p3'>{props.specificIngredient.title}</div>
            <div className='grey_line_p3'></div>
        </>
    );
}
