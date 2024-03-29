import '../../style/cssP2.css';
import HeaderP2 from '../Page2Components/HeaderP2';
import { useLocation } from 'react-router-dom';
import MainP2 from './MainP2';
import FooterP2 from './FooterP2';
import { useSelector } from 'react-redux';




// The HomeP2 component is responsible for rendering the layout of the second page of the application.
// It imports the necessary components such as HeaderP2, MainP2, and FooterP2,
// as well as hooks like useLocation and useSelector from React Router DOM and Redux respectively.
// It retrieves data from the location state, specifically ingredientList and myJson,
// which are passed down as props to the HeaderP2 and MainP2 components. Additionally,
// it accesses user information using the useSelector hook.
// The component then returns a layout containing the imported components
// wrapped in a <div> with the class name "lay_out".
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