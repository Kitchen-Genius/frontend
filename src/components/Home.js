import HeaderP1 from "./Page1Components/HeaderP1"
import '../style/cssP1.css'
import MainP1 from "./Page1Components/MainP1"
import FooterP1 from "../components/Page1Components/FooterP1"
import { useSelector } from "react-redux"

export default function Home () {
    // in this component we managing the page1 components and formating them with father div "lay_out"
    const user = useSelector((state)=> state.user)
    console.log(user)
    return (
        <div className="lay_out">
            <HeaderP1 />
            <MainP1 />
            <FooterP1 />
        </div>


    )

}