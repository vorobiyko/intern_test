import React, {useEffect, useState} from "react";
import s from './CreatePhoto.module.css'
import axios from "axios";



const CreatePhoto = ({isRefresh,setIsRefresh,
                         checkBtnNextforData,page,
                     valueLimit,isDataRespons,setDataRespons,setIsVoidData,
                         isOrder, getInfoAboutPhoto,returnDefValue,favPostorDelete}) => {



    let amountElements = valueLimit;
    let arrData = []
    let arrPhoto = []
    let grid = document.getElementById('grid')
    const RequestUploadImage = () => {
        axios.defaults.headers.common['x-api-key'] = "9bda40e4-0dfe-4b4e-bba3-db56f391102f"
        const promise = axios.get('https://api.thecatapi.com/v1/images',
            {params:{
                limit: 50,
                    order: isOrder
            }})
            .then((response)=> setDataRespons(response.data))
    }
    if (isDataRespons!=null){
        if (isDataRespons.length==0){
            setIsVoidData(null)
        }
        else {
            setIsVoidData(false)
        }
    }

    useEffect(()=>{
            setIsRefresh(false)
            RequestUploadImage()
    },[isRefresh,isOrder])


    if (isDataRespons!=null){
        for (let i = 0; i < isDataRespons.length; i++) {
            arrData[i] = isDataRespons[i]
        }
    }

    const getPhoto = () => {
        if (arrData != null) {
            if (page != 0) {
                let start = 0;
                let finish = valueLimit * page
                arrData.splice(start, finish)
            }
            checkBtnNextforData(arrData)
            if (valueLimit > arrData.length) {
                amountElements = arrData.length
            } else {
                amountElements = valueLimit
            }
            for (let i = 0; i < amountElements; i++) {
                arrPhoto[i] = (React.createElement(
                    'div', {
                        className: s.photo, key: `key${i}`, id: arrData[i].id,
                        style: {gridArea: `A${i}`, backgroundImage: `url(${arrData[i].url})`}
                    }, <div className = {s.hoverGround} onMouseLeave={()=>returnDefValue(i)} onMouseEnter={()=>getInfoAboutPhoto(arrData[i].id,i)} >
                        <div className={s.buttonFav} id={`buttonFav${i}`} onClick={()=>favPostorDelete(arrData[i].id,i)}>
                            <div id={`heard${i}`} className={s.iconBox}>
                                <svg className={s.spinner} id={`loader${i}`} viewBox="0 0 16 16">
                                    <circle className={s.path} cx="8" cy="8" r="6" fill="none" stroke-width="2"></circle>
                                </svg>
                            </div>
                        </div>
                    </div>
                ))
            }
        }
        return arrPhoto
    }
    if (valueLimit==5){
        getPhoto()
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
                if(rows>=12 && rows<=15){
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
                if (rows>=17 && rows<=20){
                    gHeight = gHeight-1600
                    st = '"'+arrG[0]+'"'+" "+'"'+arrG[1]+'"'
                }
            }
            grid.style.height = `${gHeight}px`
            grid.style.gridTemplateAreas = st
        }
    }
    return(
        <div className={s.gridPhotos} id='grid'>
            {arrPhoto.length == 0?<h3>Your uploaded photos will be here</h3>:arrPhoto}
        </div>
    )
}
export default CreatePhoto