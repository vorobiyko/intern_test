import React, {useLayoutEffect} from "react";
import s from './BreedsPhoto.module.css'
import axios from "axios";
import async from "async";
import {NavLink} from "react-router-dom";



const BreedsPhoto = ({
                         valueLimit,objRespData,idBreed,
                         page,arrObj,checkBtnNextforData,
                         text,dataPhotoById,setDataPhotoById,
                         setCurrentId, currentId,arrPhoto
}) => {
    let grid = document.getElementById('grid')

    let arrObjOtherBreed = []
    let amountElements = valueLimit;



    useLayoutEffect(()=>{
        if (idBreed!='all'){
            async.promise = axios.get(`https://api.thecatapi.com/v1/images/search?limit=20&breed_ids=${idBreed}&order=RANDOM`)
                .then((images)=> setDataPhotoById(images.data),
                    (e)=>console.warn("faile images",e))
        }
    },[idBreed])


    if(dataPhotoById!=null){
        for (let i = 0; i < dataPhotoById.length; i++) {
            arrObjOtherBreed[i] = dataPhotoById[i]
        }
        for (let i = 0; i < arrObjOtherBreed.length; i++) {
            if (arrObjOtherBreed[i].url==undefined){
                arrObjOtherBreed.splice(i,1)
            }
        }
    }
    const getPhoto = () => {
        if (idBreed!='all' && arrObjOtherBreed!=null){
            if (page!=0){
                let start = 0;
                let finish = valueLimit*page
                arrObjOtherBreed.splice(start,finish)
            }
            checkBtnNextforData(arrObjOtherBreed)
            if (valueLimit>arrObjOtherBreed.length){
                amountElements = arrObjOtherBreed.length
            }
            else{
                amountElements = valueLimit
            }
            for (let i = 0; i < amountElements; i++) {
                arrPhoto[i] = ( React.createElement(
                        'div',{className: s.photo,key:`key${i}`,id: arrObjOtherBreed[i].id,
                            style:{gridArea: `A${i}`,backgroundImage: `url(${arrObjOtherBreed[i].url})`}},
                    React.createElement('div',{className: s.hoverGround},
                        <NavLink to='/breeds/image'
                                 onClick={()=>setCurrentId({
                                     id: arrObjOtherBreed[i].id,
                                     url: arrObjOtherBreed[i].url,
                                     breedId: idBreed
                                 })}
                                 className={s.breedsName}>
                            {React.createElement('h4',{},text)}
                        </NavLink>)
                ))}
        }
        return arrPhoto
    }
    if (objRespData!=null){

        for (let i = 0; i < objRespData.length; i++) {
            arrObj[i] = objRespData[i]
        }
        for (let i = 0; i < arrObj.length; i++) {
            if (arrObj[i].image==undefined){
                arrObj.splice(i,1)
            }
        }
        const defGetPhoto = () => {
            if(idBreed=='all'){
                if (page!=0){
                    let start = 0;
                    let finish = valueLimit*page
                    arrObj.splice(start,finish)
                }
                checkBtnNextforData(arrObj)
                if (valueLimit>arrObj.length){
                    amountElements = arrObj.length
                }
                else{
                    amountElements = valueLimit
                }
                for (let i = 0; i < amountElements; i++) {
                    arrPhoto[i] = ( React.createElement(
                            'div',{className: s.photo,key:`key${i}`,id: arrObj[i].image.id,
                                style:{gridArea: `A${i}`,backgroundImage: `url(${arrObj[i].image.url})`}},
                            React.createElement('div',{className: s.hoverGround},
                                <NavLink to='/breeds/image'
                                         onClick={()=> setCurrentId({
                                             id: arrObj[i].image.id,
                                             url: arrObj[i].image.url,
                                             breedId: arrObj[i].id
                                         })} className={s.breedsName}>
                                    {React.createElement('h4',{},arrObj[i].name)}
                                </NavLink>
                            ))
                    )}
            }
            return arrPhoto
        }

        if (valueLimit==5){
            getPhoto()
            defGetPhoto()
            if(grid!=null&&arrPhoto!=null){
                let arrGrig = [0,1,2,3,4]
                let arrL = []
                for (let i = 0; i < valueLimit; i++) {
                    arrL[i]=`A${arrGrig[i]}`
                }
                let arrG = [`${arrL[0]} ${arrL[1]} ${arrL[2]}`,
                    `${arrL[0]} ${arrL[4]} ${arrL[4]}`,
                    `${arrL[3]} ${arrL[4]} ${arrL[4]}`]
                let st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'
                let gHeight = 460
                if (arrPhoto.length<valueLimit){
                    let rows = valueLimit-arrPhoto.length
                    if (rows>=2){
                        gHeight = gHeight-160
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'
                    }
                }
                grid.style.height = `${gHeight}px`
                grid.style.gridTemplateAreas = st
            }
        }

        if (valueLimit==10){
            getPhoto()
            defGetPhoto()
            if(grid!=null){
                let arrGrig = [0,1,2,3,4,5,6,7,8,9]
                let arrL = []
                for (let i = 0; i < valueLimit; i++) {
                    arrL[i]=`A${arrGrig[i]}`
                }
                let gHeight = 940
                let arrG = [`${arrL[0]} ${arrL[1]} ${arrL[2]}`,
                    `${arrL[0]} ${arrL[4]} ${arrL[4]}`,
                    `${arrL[3]} ${arrL[4]} ${arrL[4]}`,
                    `${arrL[5]} ${arrL[6]} ${arrL[7]}`,
                    `${arrL[8]} ${arrL[8]} ${arrL[7]}`,
                    `${arrL[8]} ${arrL[8]} ${arrL[9]}`]
                let st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+
                    '"'+arrG[3]+'"'+" "+'"'+arrG[4]+'"'+" "+'"'+arrG[5]+'"'
                if (arrPhoto.length<valueLimit){
                    let rows = valueLimit-arrPhoto.length
                    if (rows==2){
                        gHeight = gHeight-180
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+
                            '"'+arrG[3]+'"'+" "+'"'+arrG[4]+'"'
                    }
                    if (rows==3||rows==4){
                        gHeight = gHeight-320
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+
                            '"'+arrG[3]+'"'
                    }
                    if (rows==5||rows==6){
                        gHeight = gHeight-480
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'
                    }
                    if(rows>6){
                        gHeight = gHeight-640
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'
                    }
                }
                grid.style.height = `${gHeight}px`
                grid.style.gridTemplateAreas = st
            }
        }
        if (valueLimit==15){
            getPhoto()
            defGetPhoto()
            if(grid!=null){
                let arrGrig = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
                let arrL = []
                for (let i = 0; i < valueLimit; i++) {
                    arrL[i]=`A${arrGrig[i]}`
                }
                let gHeight = 1420
                let arrG = [`${arrL[0]} ${arrL[1]} ${arrL[2]}`,
                    `${arrL[0]} ${arrL[4]} ${arrL[4]}`,
                    `${arrL[3]} ${arrL[4]} ${arrL[4]}`,
                    `${arrL[5]} ${arrL[6]} ${arrL[7]}`,
                    `${arrL[8]} ${arrL[8]} ${arrL[7]}`,
                    `${arrL[8]} ${arrL[8]} ${arrL[9]}`,
                    `${arrL[10]} ${arrL[11]} ${arrL[12]}`,
                    `${arrL[10]} ${arrL[14]} ${arrL[14]}`,
                    `${arrL[13]} ${arrL[14]} ${arrL[14]}`]
                let st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+'"'+arrG[3]+'"'+" "+'"'+arrG[4]+'"'+" "+'"'+arrG[5]+'"'+" "+'"'+arrG[6]+'"'+" "+'"'+arrG[7]+'"'+" "+'"'+arrG[8]+'"'
                if (arrPhoto.length<valueLimit){
                    let rows = valueLimit-arrPhoto.length
                    if (rows>=2&&rows<5){
                        gHeight = gHeight-180
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+'"'+arrG[3]+'"'+" "+'"'+arrG[4]+'"'+" "+'"'+arrG[5]+'"'+" "+'"'+arrG[6]+'"'+" "+'"'+arrG[7]+'"'
                    }
                    if (rows==5||rows==6){
                        gHeight = gHeight-480
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+'"'+arrG[3]+'"'+" "+'"'+arrG[4]+'"'+" "+'"'+arrG[5]+'"'
                    }
                    if (rows==7){
                        gHeight = gHeight-640
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+'"'+arrG[3]+'"'+" "+'"'+arrG[4]+'"'
                    }
                    if(rows==8 || rows==9){
                        gHeight = gHeight-800
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+'"'+arrG[3]+'"'
                    }
                    if(rows==10 || rows==11){
                        gHeight = gHeight-960
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'
                    }
                    if(rows>=12 && rows<15){
                        gHeight = gHeight-1120
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'
                    }
                }
                grid.style.height = `${gHeight}px`
                grid.style.gridTemplateAreas = st
            }
        }
        if (valueLimit==20) {
            getPhoto()
            defGetPhoto()
            if (grid != null) {
                let arrGrig = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]
                let arrL = []
                for (let i = 0; i < valueLimit; i++) {
                    arrL[i]=`A${arrGrig[i]}`
                }
                let gHeight = 1900
                let arrG = [`${arrL[0]} ${arrL[1]} ${arrL[2]}`,
                    `${arrL[0]} ${arrL[4]} ${arrL[4]}`,
                    `${arrL[3]} ${arrL[4]} ${arrL[4]}`,
                    `${arrL[5]} ${arrL[6]} ${arrL[7]}`,
                    `${arrL[8]} ${arrL[8]} ${arrL[7]}`,
                    `${arrL[8]} ${arrL[8]} ${arrL[9]}`,
                    `${arrL[10]} ${arrL[11]} ${arrL[12]}`,
                    `${arrL[10]} ${arrL[14]} ${arrL[14]}`,
                    `${arrL[13]} ${arrL[14]} ${arrL[14]}`,
                    `${arrL[15]} ${arrL[16]} ${arrL[17]}`,
                    `${arrL[18]} ${arrL[18]} ${arrL[17]}`,
                    `${arrL[18]} ${arrL[18]} ${arrL[19]}`]
                let st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+
                    '"'+arrG[3]+'"'+" "+'"'+arrG[4]+'"'+" "+'"'+arrG[5]+'"'+" "+
                    '"'+arrG[6]+'"'+" "+'"'+arrG[7]+'"'+" "+'"'+arrG[8]+'"'+" "+
                    '"'+arrG[9]+'"'+" "+'"'+arrG[10]+'"'+" "+'"'+arrG[11]+'"'
                if (arrPhoto.length<valueLimit){
                    let rows = valueLimit-arrPhoto.length
                    if (rows==2){
                        gHeight = gHeight-180
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+
                            '"'+arrG[3]+'"'+" "+'"'+arrG[4]+'"'+" "+'"'+arrG[5]+'"'+" "+
                            '"'+arrG[6]+'"'+" "+'"'+arrG[7]+'"'+" "+'"'+arrG[8]+'"'+" "+
                            '"'+arrG[9]+'"'+" "+'"'+arrG[10]+'"'
                    }
                    if (rows==3||rows==4){
                        gHeight = gHeight-320
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+
                            '"'+arrG[3]+'"'+" "+'"'+arrG[4]+'"'+" "+'"'+arrG[5]+'"'+" "+
                            '"'+arrG[6]+'"'+" "+'"'+arrG[7]+'"'+" "+'"'+arrG[8]+'"'+" "+
                            '"'+arrG[9]+'"'
                    }
                    if (rows==5 || rows==6){
                        gHeight = gHeight-480
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+
                            '"'+arrG[3]+'"'+" "+'"'+arrG[4]+'"'+" "+'"'+arrG[5]+'"'+" "+
                            '"'+arrG[6]+'"'+" "+'"'+arrG[7]+'"'+" "+'"'+arrG[8]+'"'
                    }
                    if(rows>=7 && rows<10){
                        gHeight = gHeight-640
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+
                            '"'+arrG[3]+'"'+" "+'"'+arrG[4]+'"'+" "+'"'+arrG[5]+'"'+" "+
                            '"'+arrG[6]+'"'+" "+'"'+arrG[7]+'"'
                    }
                    if(rows==10 || rows==11){
                        gHeight = gHeight-960
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+
                            '"'+arrG[3]+'"'+" "+'"'+arrG[4]+'"'+" "+'"'+arrG[5]+'"'
                    }
                    if(rows==12){
                        gHeight = gHeight-1120
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+
                            '"'+arrG[3]+'"'+" "+'"'+arrG[4]+'"'
                    }
                    if (rows==13 || rows==14){
                        gHeight = gHeight-1280
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'+" "+
                            '"'+arrG[3]+'"'
                    }
                    if (rows==15 || rows==16){
                        gHeight = gHeight-1440
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'+" "+'"'+arrG[2]+'"'
                    }
                    if (rows>=17 && rows<20){
                        gHeight = gHeight-1600
                        st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'
                    }
                }
                grid.style.height = `${gHeight}px`
                grid.style.gridTemplateAreas = st
            }
        }
    }
    return(
        <div className={s.gridPhotos} id='grid'>
            {arrPhoto}
        </div>
    )

}
export default BreedsPhoto;