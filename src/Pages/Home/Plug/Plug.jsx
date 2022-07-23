import React,{useEffect} from "react";
import s from "./Plug.module.css";
import girl_and_pet from "../../../images/girl-and-pet 1.svg";

const Plug = ({setIsNavBar}) => {

    useEffect(()=>{
        setIsNavBar(false)
    },[])

    return(
        <div className={s.rContainerBG}>
            <img src={girl_and_pet}/>
        </div>
    )

}
export default Plug;