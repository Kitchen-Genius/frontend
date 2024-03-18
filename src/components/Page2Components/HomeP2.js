import '../../style/cssP2.css';
import HeaderP2 from '../Page2Components/HeaderP2';
import { useLocation } from 'react-router-dom';
import MainP2 from './MainP2';
import FooterP2 from './FooterP2';
import { useDispatch, useSelector } from 'react-redux';
import { setUser,setInfor } from '../Store';


export default function HomeP2() {
    const location = useLocation();
    const ingredientList = location.state ? location.state.ingredientList : null;
    const myJson = location.state? location.state.data : null;
    const infor = useSelector((state) => state.infor);
    const user = useSelector((state) => state.user);
    
    

    
    return ( 
        <div className="lay_out">
            <HeaderP2  ingredientList={ingredientList}/>
            <MainP2  ingredientList={ingredientList}  myJson={myJson}  />
            <FooterP2 ingredientList={ingredientList}/>
        </div>

    

    )
}