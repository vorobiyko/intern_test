import React, {useState} from "react";
import s from './Breeds.module.css'
import btnBackdef from './../../../images/btnBackDeff.svg'
import arrow from './../../../images/arrowSelect.svg'
import BreedsOption from "./BreedsOption";
import BreedsPhoto from "./BreedsPhoto";

const Breeds = ({
                    data,setData,dataPhotoById,setDataPhotoById,currentId,setCurrentId,
    setCheackBreed
}) => {
    let arrPhoto = [];
    const sortZa = <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M4 0.212836C4.26035 -0.0709453 4.68246 -0.0709453 4.94281 0.212836L8.94281 4.57284L8 5.6005L5.13807 2.48099V21.8H3.80474V2.48099L0.942809 5.6005L0 4.57284L4 0.212836ZM15.1381 1.45333C14.0335 1.45333 13.1381 2.42935 13.1381 3.63333V5.81333H17.1381V3.63333C17.1381 2.42935 16.2426 1.45333 15.1381 1.45333ZM17.1381 7.26667V10.1733H18.4714V3.63333C18.4714 1.6267 16.979 1.08282e-08 15.1381 1.08282e-08C13.2971 1.08282e-08 11.8047 1.6267 11.8047 3.63333V10.1733H13.1381V7.26667H17.1381ZM11.8047 11.6267H15.8047C17.2775 11.6267 18.4714 12.928 18.4714 14.5333C18.4714 15.4015 18.1222 16.1807 17.5686 16.7133C18.1222 17.2459 18.4714 18.0252 18.4714 18.8933C18.4714 20.4986 17.2775 21.8 15.8047 21.8H11.8047V11.6267ZM15.8047 15.9867C16.5411 15.9867 17.1381 15.336 17.1381 14.5333C17.1381 13.7307 16.5411 13.08 15.8047 13.08H13.1381V15.9867H15.8047ZM13.1381 17.44H15.8047C16.5411 17.44 17.1381 18.0907 17.1381 18.8933C17.1381 19.696 16.5411 20.3467 15.8047 20.3467H13.1381V17.44Z" fill="#8C8C8C"/>
    </svg>
    const sortAz = <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.80474 19.319V0H5.13807V19.319L8 16.1995L8.94281 17.2272L4.94281 21.5872C4.81778 21.7234 4.64822 21.8 4.4714 21.8C4.29459 21.8 4.12502 21.7234 4 21.5872L0 17.2272L0.942809 16.1995L3.80474 19.319ZM15.1381 1.45333C14.0335 1.45333 13.1381 2.42935 13.1381 3.63333V5.81333H17.1381V3.63333C17.1381 2.42935 16.2426 1.45333 15.1381 1.45333ZM17.1381 7.26667V10.1733H18.4714V3.63333C18.4714 1.6267 16.979 0 15.1381 0C13.2971 0 11.8047 1.6267 11.8047 3.63333V10.1733H13.1381V7.26667H17.1381ZM11.8047 11.6267H15.8047C17.2775 11.6267 18.4714 12.928 18.4714 14.5333C18.4714 15.4015 18.1222 16.1807 17.5686 16.7133C18.1222 17.2459 18.4714 18.0252 18.4714 18.8933C18.4714 20.4986 17.2775 21.8 15.8047 21.8H11.8047V11.6267ZM15.8047 15.9867C16.5411 15.9867 17.1381 15.336 17.1381 14.5333C17.1381 13.7307 16.5411 13.08 15.8047 13.08H13.1381V15.9867H15.8047ZM13.1381 17.44H15.8047C16.5411 17.44 17.1381 18.0907 17.1381 18.8933C17.1381 19.696 16.5411 20.3467 15.8047 20.3467H13.1381V17.44Z" fill="#8C8C8C"/>
    </svg>

    const [state,setState] = useState(false)

    const [sortActive,setSortActive] = useState({az: true,za: false})
    const [page, setPage] = useState(0)
    const [idBreed,setIdBreed] = useState('all')

    setCheackBreed(idBreed)

    const open = () => {
        let optionBox = document.getElementById('optionBox')
        optionBox.style.display = 'flex'
        setState(true)
        return state
    }
    const closeWind = () => {
        setTimeout(close,200)
    }
    const close = () =>{
        let optionBox = document.getElementById('optionBox')
        optionBox.style.display = 'none'
        setState(false)
        return state

    }
    let initText = 'All Breeds'
    const [text,setText] = useState(initText)

    const chooseBreed = (id) => {
        setIdBreed(id)
        let q = document.getElementById(id)
        setText(q.innerText)
        return text,idBreed;
    }

    const [stateLimit,setStateLimit] = useState(false)
    const optionLimit = document.getElementById('optionLimitBox')

    const openLimit = () => {
        optionLimit.style.display = 'flex'
        setStateLimit(true)
        return stateLimit
    }
    const closeLimitWind = () => {
        setTimeout(closeLimit,200)
    }
    const closeLimit = () =>{
        optionLimit.style.display = 'none'
        setStateLimit(false)
        return stateLimit
    }

    let initValue = 5;

    const [valueLimit,setValueLimit] = useState(initValue)
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

    let arrObj = [];
    const checkBtnNextforData = (arrObj) => {
        if (btnNext!=null && arrObj!=null){
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
    const az = document.getElementById('az')
    const za = document.getElementById('za')
    if (za,az!=null){
        if (idBreed!='all'){

            az.style.pointerEvents = 'none'
            za.style.pointerEvents = 'none'
        }
        else {
            az.style.pointerEvents = 'auto'
            za.style.pointerEvents = 'auto'
        }
    }
    const sort = () => {
        if (arrPhoto!=null){
            setData(data.reverse())
            setSortActive({za: !sortActive.za,az: !sortActive.az})
        }
    }

    return(
        <div>
            <div className={s.breedsContent}>
                <div className={s.breedsHeader}>
                    <div className={s.btnBack}>
                        <img src={btnBackdef}/>
                    </div>
                    <div className={s.breedsTitle}>
                        <h2>Breeds</h2>
                    </div>
                    <div className={s.filterBreeds}   >
                        <input type="radio" id='inputBlock'  className={s.inp}
                               onClick={state?closeWind:open} onBlur={state?closeWind:null} />

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
                    <div className={s.limitImage}>
                        <input type="radio" id='inputLimit' className={s.inp} onClick={stateLimit?closeLimitWind:openLimit} onBlur={stateLimit?closeLimitWind:null}/>
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
                    <div className={sortActive.za?s.sortingZtoA+' '+s.active:s.sortingZtoA} id='za' onClick={()=>(sortActive.za)?'':sort()}>
                        {sortZa}
                    </div>
                    <div className={sortActive.az?s.sortingAtoZ+' '+s.active:s.sortingAtoZ} id='az' onClick={()=>(sortActive.az)?'':sort()}>
                        {sortAz}
                    </div>
                </div>
                <div className={s.breedsGrid} >
                    <BreedsPhoto valueLimit={valueLimit} objRespData={data} idBreed={idBreed}
                    page={page} arrObj={arrObj} checkBtnNextforData={checkBtnNextforData} text={text}
                                 dataPhotoById={dataPhotoById} setDataPhotoById={setDataPhotoById}
                                 currentId={currentId} setCurrentId={setCurrentId}  arrPhoto={arrPhoto}
                    />
                </div>
                <div className={s.btns} >
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
export default Breeds;