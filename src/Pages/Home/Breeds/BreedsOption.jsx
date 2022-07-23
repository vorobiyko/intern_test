import React, {useLayoutEffect} from "react";
import axios from "axios";
import s from "./Breeds.module.css";
import async from "async";


const BreedsOption = ({chooseBreed,data,setData,setPage}) => {

    let countBreeds = 0;
    let ArrBreeds = [];
    let ArrOptions = [];
    let arrBreedsId = [];

    useLayoutEffect(()=>{
        if(data==null){
            async.promise = axios.get(`https://api.thecatapi.com/v1/breeds`,
                {
                    headers: {
                        'x-api-key': '9bda40e4-0dfe-4b4e-bba3-db56f391102f'
                    }
                })
            .then(
                (breeds) => setData(breeds.data),
                (e)=>console.warn('failue',e))
        }
        },[])
    if (data!==null){
        countBreeds = data.length;
        for (let i = 0; i < countBreeds; i++) {
            ArrBreeds[i] = data[i].name;
            arrBreedsId[i] = data[i].id;
        }
        ArrBreeds.splice(0,0,'All Breeds')
        arrBreedsId.splice(0,0,'all')
        const updateData = (i) => {
            chooseBreed(arrBreedsId[i])
            setPage(0)
        }
        for (let i = 0; i < ArrBreeds.length; i++) {
            ArrOptions[i] = React.createElement(
                "div", {onClick: event =>updateData(i),className: s.option, id: arrBreedsId[i], key: `${i}`},
                React.createElement('h4', {key: 'opt'}, `${ArrBreeds[i]}`));
        }
    }

    return (
        ArrOptions
    )

}
export default BreedsOption