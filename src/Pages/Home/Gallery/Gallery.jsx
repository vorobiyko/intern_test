import React,{useState} from "react";
import s from './Gallery.module.css'
import btnBackdef from './../../../images/btnBackDeff.svg'
import arrow from "../../../images/arrowSelect.svg";
import BreedsOption from "../Breeds/BreedsOption";
import {NavLink} from "react-router-dom";
import CreatePhoto from "./UploadPhotos/CreatePhoto";
import axios from "axios";
import iconNoFill from './../../../images/favourite.svg'
import iconFill from './../../../images/favoriteFill.svg'


const Gallery = ({data, setData, setIsModal}) => {
    const iconUpload = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.86601 0L12.2355 4.03339L11.4129 4.92452L8.48919 2.22567V12.3618H7.27645V2.30464L4.67336 4.90772L3.81583 4.05019L7.86601 0ZM1.21274 14.7873V7.51081H0V16H15.7656V7.51081H14.5529V14.7873H1.21274Z" fill="#FF868E"/>
    </svg>


    const [inpBreed,setInpBreed] = useState(false)
    let initText = 'All Breeds'
    const [text,setText] = useState(initText)
    const [idBreed,setIdBreed] = useState('all')
    const [page, setPage] = useState(0)
    let initValue = 5;
    const [valueLimit,setValueLimit] = useState(initValue)
    const [isOrder,setIsOrder] = useState('Random')
    const [isType, setIsType] = useState('All')
    const [isRefresh, setIsRefresh] =useState(true)
    const [isDataRespons,setDataRespons] = useState(null)
    const [isVoidData, setIsVoidData] = useState(null)


    const open = () => {
        let optionBox = document.getElementById('optionBox')
        optionBox.style.display = 'flex'
        setInpBreed(true)
        return inpBreed
    }
    const closeWind = () => {
        setTimeout(close,200)
    }
    const close = () =>{
        let optionBox = document.getElementById('optionBox')
        optionBox.style.display = 'none'
        setInpBreed(false)
        return inpBreed
    }



    const chooseBreed = (id) => {
        setIdBreed(id)
        let q = document.getElementById(id)
        setText(q.innerText)
        return text,idBreed;
    }
    const [state,setState] = useState(
        {
            order: false,
            type: false,
            limit: false
        })




    const openLimit = () => {
        const optionLimit = document.getElementById('optionLimitBox')
        optionLimit.style.display = 'flex'
        setState({limit: true,type: false,order: false})
        return state
    }
    const closeLimitWind = () => {
        setTimeout(closeLimit,200)
    }
    const closeLimit = () =>{
        const optionLimit = document.getElementById('optionLimitBox')
         optionLimit.style.display = 'none'
        setState({limit: false, type: false, order: false})
        return state
    }
    const openOrder = () => {
        const optionOrder = document.getElementById('optionOrderBox')
        optionOrder.style.display = 'flex'
        let bInp = document.getElementById('bInp')
        bInp.style.zIndex = '-2'
        setState({limit: false,type: false,order: true})
        return state
    }
    const closeOrderWind = () => {
        setTimeout(closeOrder,200)
    }
    const closeOrder = () =>{
        let bInp = document.getElementById('bInp')
        const optionOrder = document.getElementById('optionOrderBox')
        bInp.style.zIndex = '1'
        optionOrder.style.display = 'none'
        setState({limit: false, type: false, order: false})
        return state
    }
    const openType = () => {
        const optionType = document.getElementById('optionTypeBox')
        optionType.style.display = 'flex'
        let lInp = document.getElementById('lInp')
        lInp.style.zIndex = '-2'
        setState({limit: false,type: true,order: false})
        return state
    }
    const closeTypeWind = () => {
        setTimeout(closeType,200)
    }
    const closeType = () =>{
        const optionType = document.getElementById('optionTypeBox')
        optionType.style.display = 'none'
        let lInp = document.getElementById('lInp')
        lInp.style.zIndex = '1'
        setState({limit: false, type: false, order: false})
        return state
    }
    const getLimit = (num) => {
        if (num==5){
            setValueLimit(5);
            if(page!=0 && 5>=valueLimit){
                setPage(page/(10/valueLimit))
            }
            if(page!=0 && 5<valueLimit){
                setPage(page*(valueLimit/5))
            }
        }
        else if(num == 10){
            setValueLimit(10)
            if(page!=0 && 10>valueLimit){
                setPage(page/(10/valueLimit))
            }
            if(page!=0 && 10<valueLimit){
                setPage(page*(valueLimit/10))
            }
        }
        else if (num == 15){
            setValueLimit(15)
            if(page!=0 && 15>valueLimit){
                setPage(page/(15/valueLimit))
            }
            if(page!=0 && 15<valueLimit){
                setPage(page*(valueLimit/15))
            }
        }
        else if (num == 20){
            setValueLimit(20)
            if(page!=0 && 20>valueLimit){
                setPage(page/(20/valueLimit))
            }
            if(page!=0 && 20<valueLimit){
                setPage(page*(valueLimit/20))
            }
        }
        return valueLimit
    }
    const btnNext = document.getElementById('next')
    const nextH4 = document.getElementById('nextH4')
    const nextPath = document.getElementById('nextPath')
    const checkBtnNextforData = (arrObj) => {
        if (btnNext!=null){
            if(arrObj.length>valueLimit){
                btnNext.style.pointerEvents = 'auto'
                btnNext.style.background = '#FF868E'
                nextH4.style.color = 'white'
                nextPath.style.fill = 'white'
            }
            else{
                btnNext.style.pointerEvents = 'none'
                btnNext.style.background = '#F8F8F7'
                nextH4.style.color = '#8C8C8C'
                nextPath.style.fill = '#8C8C8C'
            }
        }
    }
const [canAdd,setCanAdd] = useState({canPostFav: null,fav_id: null})

    const getInfoAboutPhoto = (id,count)=>{
        let loader = document.getElementById(`loader${count}`)
        let icon = document.getElementById(`heard${count}`)
        let buttonFav = document.getElementById(`buttonFav${count}`)
        let promise = axios.get("https://api.thecatapi.com/v1/favourites",
                {params: {
                        limit: '100',
                        sub_id: "eevanesens"
                    }})
                .then((e)=>{
                    for (let i = 0; i < e.data.length; i++) {
                        if (e.data[i].image_id == id){
                            buttonFav.style.pointerEvents = 'auto'
                           loader.style.display = 'none'
                            icon.style.backgroundImage = `url(${iconFill})`
                            setCanAdd({
                                canPostFav: false,
                                fav_id: e.data[i].id
                            })
                        }
                        if (e.data[i].image_id !== id){
                            buttonFav.style.pointerEvents = 'auto'
                            loader.style.display = 'none'
                            icon.style.backgroundImage = `url(${iconNoFill})`
                            setCanAdd({
                                canPostFav: true,
                                fav_id: null
                            })
                        }
                    }
                })
    }
    const favPostorDelete =(id,count)=>{
        let icon = document.getElementById(`heard${count}`)
        if (canAdd.canPostFav==true){
            let promise = axios.post('https://api.thecatapi.com/v1/favourites',
                {
                    image_id: id,
                    sub_id: "eevanesens"
                }).then(()=>{
                icon.style.backgroundImage = `url(${iconFill})`

            })
        }
        if (canAdd.canPostFav==false){
            let promise = axios.delete(`https://api.thecatapi.com/v1/favourites/${canAdd.fav_id}`)
                .then(()=>{
                    icon.style.backgroundImage = `url(${iconNoFill})`
                })
        }

    }
    const returnDefValue = (i) => {
        let loader = document.getElementById(`loader${i}`)
        let icon = document.getElementById(`heard${i}`)
        let buttonFav = document.getElementById(`buttonFav${i}`)
        loader.style.display = 'block'
        buttonFav.style.pointerEvents = 'none'
        icon.style.backgroundImage = `none`
    }


    return(
        <div>
            <div className={s.galleryContent}>
                <div className={s.galleryHeader}>
                    <div className={s.btnBack}>
                        <img src={btnBackdef}/>
                    </div>
                    <div className={s.galleryTitle}>
                        <h2>Gallery</h2>
                    </div>
                    <NavLink to='/gallery/upload' onClick={()=>setIsModal(true)} className={s.btnUpload}>
                        {iconUpload}
                        <h5>Upload</h5>
                    </NavLink>
                </div>
                <div className={s.galleryContentBox}>
                    <div className={s.gallerySortMenuGrid}>
                        <div className={s.orderInputBox}>
                            <h4 style={{marginLeft: '10px'}}>Order</h4>
                            <div className={s.orderInput}>
                                <input type="radio" id='inputOrder' className={s.inp} onClick={state.order?closeOrderWind:openOrder} onBlur={state.order?closeOrderWind:null}/>
                                <label htmlFor="inputOrder">
                                    <h4 className={s.selectedBreeds}>{isOrder}</h4>
                                </label>
                                <img src={arrow}/>
                                <div className={s.optionOrderBox} id='optionOrderBox'>
                                    <div className={s.options}>
                                        <div className={s.option} onClick={()=>setIsOrder('Random')} ><h4>Random</h4></div>
                                        <div className={s.option} onClick={()=>setIsOrder('Desc')}><h4>Desc</h4></div>
                                        <div className={s.option} onClick={()=>setIsOrder('Asc')}><h4>Asc</h4></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.typeInputBox}>
                            <h4 style={{marginLeft: '10px'}}>Type</h4>
                            <div className={s.typeInput}>
                                <input type="radio" id='inputType' className={s.inp} onClick={state.type?closeTypeWind:openType} onBlur={state.type?closeTypeWind:null}/>
                                <label htmlFor="inputType">
                                    <h4 className={s.selectedBreeds}>{isType}</h4>
                                </label>
                                <img src={arrow}/>
                                <div className={s.optionTypeBox} id='optionTypeBox'>
                                    <div className={s.options}>
                                        <div className={s.option} onClick={()=>setIsType('All')} ><h4>All</h4></div>
                                        <div className={s.option} onClick={()=>setIsType('Static')} ><h4>Static</h4></div>
                                        <div className={s.option} onClick={()=>setIsType('Animated')} ><h4>Animated</h4></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.breedInputBox}>
                            <h4 style={{marginLeft: '10px'}}>Breed</h4>
                            <div className={s.breedInput} id='bInp'>
                                <input type="radio" id='inputBlock'  className={s.inp}
                                       onClick={inpBreed?closeWind:open} onBlur={inpBreed?closeWind:null} />

                                <label htmlFor="inputBlock">
                                    <h4 className={s.selectedBreeds}>{text}</h4>
                                </label>
                                <img src={arrow}/>
                                <div className={s.optionBox} id='optionBox'>
                                    <div className={s.optionBox1}>
                                        <div>

                                            <BreedsOption chooseBreed={chooseBreed} data={data} setData={setData} setPage={setPage} />
                                        </div>
                                    </div>
                                    <div className={s.loadMoreOpt}>
                                        <h4>...</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.limitInputBox}>
                            <h4 style={{marginLeft: '10px'}}>Limit</h4>
                            <div className={s.limitInpWithBtn}>
                                <div className={s.limitInput} id='lInp'>
                                    <input type="radio" id='inputLimit' className={s.inp} onClick={state.limit?closeLimitWind:openLimit} onBlur={state.limit?closeLimitWind:null}/>
                                    <label htmlFor="inputLimit">
                                        <h4 className={s.selectedBreeds}>Limit: {valueLimit}</h4>
                                    </label>
                                    <img src={arrow}/>
                                    <div className={s.optionLimitBox} id='optionLimitBox'>
                                        <div className={s.options}>
                                            <div className={s.option} onClick={()=>getLimit(5)}><h4>Limit: 5</h4></div>
                                            <div className={s.option} onClick={()=>getLimit(10)}><h4>Limit: 10</h4></div>
                                            <div className={s.option} onClick={()=>getLimit(15)}><h4>Limit: 15</h4></div>
                                            <div className={s.option} onClick={()=>getLimit(20)}><h4>Limit: 20</h4></div>
                                        </div>
                                    </div>
                                </div>
                                <div className={s.limitContainer} onClick={()=>setIsRefresh(true)}>
                                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.48189 2.49989L6.93396 0.953004L7.88633 0L11.0577 3.16928L7.88634 6.33873L6.93395 5.38576L8.47232 3.84832C4.51244 3.99813 1.3473 7.25498 1.3473 11.2478C1.3473 15.3361 4.66547 18.6527 8.75744 18.6527C12.8494 18.6527 16.1676 15.3361 16.1676 11.2478V10.5742H17.5149V11.2478C17.5149 16.081 13.5927 20 8.75744 20C3.92221 20 0 16.081 0 11.2478C0 6.50682 3.77407 2.64542 8.48189 2.49989Z" fill="#FF868E"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={s.galleryGrid}>
                    <CreatePhoto isRefresh={isRefresh} setIsRefresh={setIsRefresh} checkBtnNextforData={checkBtnNextforData}
                    page={page} valueLimit={valueLimit} isDataRespons={isDataRespons} setDataRespons={setDataRespons}
                                 setIsVoidData={setIsVoidData} isOrder={isOrder} getInfoAboutPhoto={getInfoAboutPhoto}
                                 returnDefValue={returnDefValue} favPostorDelete={favPostorDelete}/>
                </div>
                <div className={s.btns} style={isVoidData==null?{display: 'none'}:{display: 'flex'}} >
                    <div className={s.btnPrev} onClick={()=>setPage(page-1)}
                         style={(page<=0)?{pointerEvents: 'none',background: '#F8F8F7'}:{pointerEvents: 'auto', background: '#FF868E'}}>
                        <svg className={s.arrowPrev} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path style={(page<=0)?{fill: '#8C8C8C'}:{ fill: '#FFFFFF'}}
                                  d="M6.59406 7.17417L11.7538 2.01436C12.0821 1.68616 12.0821 1.15395 11.7538 0.825875C11.4256 0.497795 10.8935 0.497795 10.5655 0.825875L5.99993 5.39154L1.43458 0.826055C1.10635 0.497915 0.574264 0.497915 0.24617 0.826055C-0.0820567 1.15414 -0.0820567 1.68627 0.24617 2.01447L5.40591 7.17431C5.57003 7.33836 5.78492 7.42029 5.9999 7.42029C6.21498 7.42029 6.43002 7.3382 6.59406 7.17417Z" fill="#8C8C8C"/>
                        </svg>
                        <h4 style={(page<=0)?{color: '#8C8C8C'}:{color: '#FFFFFF'}}>PREV</h4>
                    </div>
                    <div className={s.btnNext} id='next' onClick={()=>setPage(page+1)}>
                        <h4 id='nextH4'>NEXT</h4>
                        <svg className={s.arrowNext} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id='nextPath' d="M6.59406 7.17417L11.7538 2.01436C12.0821 1.68616 12.0821 1.15395 11.7538 0.825875C11.4256 0.497795 10.8935 0.497795 10.5655 0.825875L5.99993 5.39154L1.43458 0.826055C1.10635 0.497915 0.574264 0.497915 0.24617 0.826055C-0.0820567 1.15414 -0.0820567 1.68627 0.24617 2.01447L5.40591 7.17431C5.57003 7.33836 5.78492 7.42029 5.9999 7.42029C6.21498 7.42029 6.43002 7.3382 6.59406 7.17417Z" fill="#8C8C8C"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Gallery;