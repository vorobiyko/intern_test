import React, {useState} from "react";
import LoaderPhoto from "../LoaderPhoto";
import s from "./Favourites.module.css";



const Favourites = ({checkPage}) => {
    const btnBack = <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.709994 10.9901L9.30969 19.5896C9.85669 20.1369 10.7437 20.1369 11.2905 19.5896C11.8373 19.0427 11.8373 18.1558 11.2905 17.6091L3.68104 9.99988L11.2902 2.39096C11.8371 1.84391 11.8371 0.957107 11.2902 0.410284C10.7434 -0.136761 9.85649 -0.136761 9.30949 0.410284L0.709774 9.00985C0.436354 9.28339 0.299805 9.64153 0.299805 9.99983C0.299805 10.3583 0.436624 10.7167 0.709994 10.9901Z" fill="#FF868E"/>
    </svg>
    const [page, setPage] = useState(0)
    const [isVoidData, setIsVoidData] = useState(null)
    const [favData,setFavData] =useState(null)

    let valueLimit = 10
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
    return(
        <div>
            <div className={s.favContent}>
                <div className={s.favHeader}>
                    <div className={s.btnBack}>
                        {btnBack}
                    </div>
                    <div className={s.favTitle}>
                        <h2>favourites</h2>
                    </div>
                </div>
                <div className={s.favGrid}>
                    <LoaderPhoto checkPage={checkPage} page={page}  checkBtnNextforData={ checkBtnNextforData}
                                 favData={favData} setFavData={setFavData} setIsVoidData={setIsVoidData} />
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
export default Favourites