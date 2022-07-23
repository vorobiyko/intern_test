import React, {useEffect, useLayoutEffect, useState} from "react";
import btnBackdef from "../../../../images/btnBackDeff.svg";
import breeds from '../Breeds.module.css'
import s from './SelectedImage.module.css'
import "./flickity.css"
import {NavLink} from "react-router-dom";
import axios from "axios";
import async from "async";

const SelectedImage = ({data,dataPhotoById,currentId,flick,cheackBreed}) => {
    let flkty;
    const [localState,setLocalState] = useState(null)
    const [locElState,setLocElState] = useState(null)
    let arrData = [];
    let arrState = [];
    let ArrElements = [];
    let objWithData={name: ' ',temperament: ' ',origin: ' ',life_span: ' ',weight: {metric: ' '},description: ' '};
    useLayoutEffect(()=>{
        if (cheackBreed!='all'){
            async.promise = axios.get(`https://api.thecatapi.com/v1/breeds`,
                {
                    headers: {
                        'x-api-key': '9bda40e4-0dfe-4b4e-bba3-db56f391102f'
                    }
                })
                .then(
                    (breeds) => setLocalState(breeds.data),
                    (e)=>console.warn('failue',e))
        }
        if (cheackBreed=='all'){
            async.promise = axios.get(`https://api.thecatapi.com/v1/images/search?limit=20&breed_ids=${currentId.breedId}&order=RANDOM`)
                .then((images)=> setLocalState(images.data),
                    (e)=>console.warn("faile images",e))
        }

    },[])
console.log(cheackBreed,localState)
    useEffect(()=>{
        if (cheackBreed!='all'){
            console.log("dataPhotoId")
            for (let i = 0; i < dataPhotoById.length; i++) {
                if (currentId.id==dataPhotoById[i].id){
                    let removed = dataPhotoById.splice(i,1)
                    dataPhotoById.splice(0,0,removed[0])
                }
                ArrElements[i] = <div className="carousel-cell"
                                      style={{background: '#F8F8F7',width: "100%",height: '100%'}}>
                    <img style={{width: '100%',height: "auto"}} src={dataPhotoById[i].url}/>
                </div>
            }
            if (locElState==null){
                setLocElState(ArrElements)
            }
        }
        console.log(localState)
        if (localState!=null && cheackBreed=='all'){
            console.log("data")
            for (let i = 0; i < localState.length; i++) {
                arrState[i]=localState[i]
            }
            for (let i = 0; i < data.length; i++) {
                arrData[i]=data[i].image
            }
            for (let i = 0; i <arrData.length ; i++) {
                if (arrData[i] == undefined){
                    arrData.splice(i,1)
                }
            }
            for (let i = 0; i < arrData.length; i++) {
                if (arrData[i].id==currentId.id){
                    arrState.splice(0,0,arrData[i])
                }
            }
            for (let i = 0; i < arrState.length; i++) {
                ArrElements[i] = <div className="carousel-cell"
                                      style={{background: '#F8F8F7',width: "100%",height: '100%'}}>
                    <img style={{width: '100%',height: "auto"}} src={arrState[i].url}/>
                </div>
            }
            if (locElState==null){
                setLocElState(ArrElements)
            }

        }
    },[localState])
        if (localState!=null){
        for (let i = 0; i < localState.length; i++) {
            if (localState[i].id == currentId.breedId){
                objWithData = localState[i]
            }
        }
        }
    if (data!=null){
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == currentId.breedId){
                objWithData = data[i]
            }
        }
    }
    useEffect(()=>{
        const e = document.querySelectorAll('.carousel-cell')
        if (e.length!=0){
            flick()
        }
    },[locElState,cheackBreed])


    return(
      <div>
          <div className={breeds.breedsContent}>
              <div className={s.breedsHeader}>
                  <NavLink to='/breeds' className={breeds.btnBack}>
                      <img src={btnBackdef}/>
                  </NavLink>
                  <div className={s.breedsTitle}>
                      <h2>Breeds</h2>
                  </div>
                  <div className={s.breedsTitleID}>

                      <h2>{currentId.breedId}</h2>
                  </div>
              </div>
              <div className={s.chooseBreedImages}>
                  <div className='main-carousel' data-flickity={flkty}
                       style={{width: '100%',height: '100%'}} >
                      {locElState}

                  </div>
              </div>
              <div className={s.breedInfo}>
                  <h2 className={s.titleBreed}>{objWithData.name}</h2>
                  <div className={s.containerInfo}>
                      <h2>{objWithData.description}</h2>
                      <div className={s.boxesWithInfo}>
                          <div className={s.boxTemperament}>
                              <span>
                                  <h4>Temperament: </h4>
                                  <h4>{objWithData.temperament}</h4>
                              </span>
                          </div>
                          <div className={s.boxAboutCat}>
                              <span>
                                  <h4>Origin:</h4><h4>{objWithData.origin}</h4>
                              </span>
                              <span>
                                  <h4>Weight: </h4>
                                  <h4>{objWithData.weight.metric}</h4>
                              </span>
                              <span>
                                  <h4>Life span: </h4>
                                  <h4>{objWithData.life_span}</h4>
                              </span>

                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

    )
}
export default SelectedImage