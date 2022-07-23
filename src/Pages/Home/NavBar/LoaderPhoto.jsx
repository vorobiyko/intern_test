import React, {useEffect, useLayoutEffect, useState} from "react";
import axios from "axios";
import s from "./LoaderPhoto.module.css";

const LoaderPhoto = ({checkPage,name,page,checkBtnNextforData,setIsVoidData,
                     isData,setIsData,favData,setFavData,isSearchData,setIsSearchData}) => {

    let arrData = []
    let arrPhoto = []
    let arrDislikesImage = []
    let arrLikesImage = []
    let amountElements
    const valueLimit = 10;
    let grid = document.getElementById('grid')
    axios.defaults.headers.common['x-api-key'] = "9bda40e4-0dfe-4b4e-bba3-db56f391102f"
    const getDislikes =  () => {
        let arrDislikes = []
            let promise = axios.get('https://api.thecatapi.com/v1/votes?sub_id=eevanesens')
                .then((e)=>{
                    for (let i = 0; i < e.data.length; i++) {
                        if (e.data[i].value == 0){
                            arrDislikes.push(e.data[i])
                        }
                    }
                })
                .then(()=>{
                    for (let i = 0; i < arrDislikes.length; i++) {
                        let promise = axios.get(`https://api.thecatapi.com/v1/images/${arrDislikes[i].image_id}`)
                            .then((e)=>{
                                arrDislikesImage.push(e.data)

                                if (arrDislikesImage.length == arrDislikes.length){
                                    setIsData(arrDislikesImage)
                                }
                            })
                    }
                })
    }
    const getLikes = () => {
        let arrLikes = []
        let promise = axios.get('https://api.thecatapi.com/v1/votes?sub_id=eevanesens')
            .then((e)=>{
                for (let i = 0; i < e.data.length; i++) {
                    if (e.data[i].value == 1){
                        arrLikes.push(e.data[i])
                    }
                }
            })
            .then(()=>{
                for (let i = 0; i < arrLikes.length; i++) {
                    let promise = axios.get(`https://api.thecatapi.com/v1/images/${arrLikes[i].image_id}`)
                        .then((e)=>{
                            arrLikesImage.push(e.data)
                            if (arrLikesImage.length == arrLikes.length){
                                setIsData(arrLikesImage)
                            }
                        })
                }
            })
    }
    const getFav = () => {
        let promise = axios.get("https://api.thecatapi.com/v1/favourites?sub_id=eevanesens")
            .then((e)=>setFavData(e.data))
    }
    const getSearch = () => {
        if (name!=''){
            let promise = axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${name}`)
                .then((e)=>{
                    let promise = axios.get(`https://api.thecatapi.com/v1/images/search?limit=40&breed_ids=${e.data[0].id}&order=RANDOM`)
                        .catch((e)=>console.log(e.data))
                        .then((e)=> setIsSearchData(e.data))
                })
        }
    }
    useLayoutEffect(()=>{
        if (checkPage=='like'){
            getLikes()

        }
        if (checkPage=='dislike'){
            getDislikes()
        }
        if (checkPage=='fav'){
            getFav()
        }
        if (checkPage=='search'){
            getSearch()
        }
    },[name,checkPage])

    const getDislikePhoto = () => {
        if (arrData!= null) {
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
                    }
                ))
            }
        }
        return arrPhoto
    }
    const getFavPhoto = () => {
        if (arrData!= null) {
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
                arrPhoto[i] = ( React.createElement(
                    'div',{className: s.photo,key:`key${i}`,id: `item${i}`,
                        style:{gridArea: `A${i}`,backgroundImage: `url(${arrData[i].image.url})`}},
                    React.createElement('div',{className: s.hoverGround},
                        <div onClick={()=>deleteFav(arrData[i].id)} style={{pointerEvents: 'auto'}} className={s.buttonFav}>
                            <svg width="20" height="17" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.07107 0C3.61354 0 0 3.61354 0 8.07107C0 10.2116 0.850339 12.2646 2.36396 13.7782L14.2929 25.7071C14.6834 26.0976 15.3166 26.0976 15.7071 25.7071L27.636 13.7782C29.1497 12.2646 30 10.2116 30 8.07107C30 3.61354 26.3865 0 21.9289 0C19.7884 0 17.7354 0.850341 16.2218 2.36396L15 3.58579L13.7782 2.36396C12.2646 0.850343 10.2116 0 8.07107 0Z" fill="#ff868e"/>
                            </svg>
                        </div>)
                ))
            }
        }
        return arrPhoto
    }
    const deleteFav = (id) =>{
        axios.defaults.headers.common['x-api-key'] = "9bda40e4-0dfe-4b4e-bba3-db56f391102f"
        let promise = axios.delete(`https://api.thecatapi.com/v1/favourites/${id}`)
            .then((e)=>{
                if(e.data.message=='SUCCESS'){
                    getFav()
                }
            })
    }
    const getSearchPhoto = () => {
        if (arrData!= null) {
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
                arrPhoto[i] = ( React.createElement(
                    'div',{className: s.photo,key:`key${i}`,id: arrData[i].id,
                        style:{gridArea: `A${i}`,backgroundImage: `url(${arrData[i].url})`}},
                    React.createElement('div',{className: s.hoverGround+' '+s.search},
                        <div className={s.breedsName}>
                            {React.createElement('h4',{},(
                                arrData[i].breeds[0].alt_names == '')?'No info':arrData[i].breeds[0].alt_names
                            )}
                        </div>)
                ))
            }
        }
        return arrPhoto
    }

    const createGrid = () =>{
        if(grid!=null && arrPhoto.length!=0){
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
    if (isSearchData!=null){
        for (let i = 0; i < isSearchData.length; i++) {
            arrData[i] = isSearchData[i]
        }
        if (checkPage=='search'){
            getSearchPhoto()
            createGrid()
        }
    }
    if (favData!=null){
        for (let i = 0; i < favData.length; i++) {
            arrData[i] = favData[i]
        }
        if (checkPage=='fav'){
            getFavPhoto()
            createGrid()
        }
    }

    if (isData!=null){
        for (let i = 0; i < isData.length; i++) {
            arrData[i] = isData[i]
        }
        if (checkPage=='dislike'||checkPage=='like'){
            getDislikePhoto()
            createGrid()
        }

    }
    if (isData!=null){
        if (isData.length==0){
            setIsVoidData(null)
        }
        else {
            setIsVoidData(false)
        }
    }
    if (isSearchData!=null){
        if (isSearchData.length==0){
            setIsVoidData(null)
        }
        else {
            setIsVoidData(false)
        }
    }
    if (favData!=null){
        if (favData.length==0){
            setIsVoidData(null)
        }
        else {
            setIsVoidData(false)
        }
    }


    return(
        <div className={s.gridPhotos} id='grid'>
            {arrPhoto.length == 0?<h3>Your uploaded photos will be here</h3>:arrPhoto}
        </div>
    )
}
export default LoaderPhoto