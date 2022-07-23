import React, {useState} from "react";
import s from './NavBar.module.css'
import {NavLink} from "react-router-dom";



const NavBar = ({setIsNavBar,setCheckPage,checkPage,setSearchValue}) => {
    let holderTxt = 'Search for breeds by name'
    const [isHover,setIsHover]=useState({bool: false,holderTxt: holderTxt});
    const [isFocus,setIsFocus]=useState(false);

    const like = <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15ZM15 2C7.8203 2 2 7.8203 2 15C2 22.1797 7.8203 28 15 28C22.1797 28 28 22.1797 28 15C28 7.8203 22.1797 2 15 2ZM10 12H8V10H10V12ZM22 12H20V10H22V12ZM9.2 16.6L9.8 17.4C12.4 20.8667 17.6 20.8667 20.2 17.4L20.8 16.6L22.4 17.8L21.8 18.6C18.4 23.1333 11.6 23.1333 8.2 18.6L7.6 17.8L9.2 16.6Z" fill="#FF868E"/>
        </svg>;
    const favourite = <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.07107 2C4.71811 2 2 4.71811 2 8.07107C2 9.68122 2.63963 11.2254 3.77817 12.364L15 23.5858L26.2218 12.364C27.3604 11.2254 28 9.68121 28 8.07107C28 4.71811 25.2819 2 21.9289 2C20.3188 2 18.7746 2.63963 17.636 3.77817L15.7071 5.70711C15.3166 6.09763 14.6834 6.09763 14.2929 5.70711L12.364 3.77818C11.2254 2.63963 9.68121 2 8.07107 2ZM0 8.07107C0 3.61354 3.61354 0 8.07107 0C10.2116 0 12.2646 0.850343 13.7782 2.36396L15 3.58579L16.2218 2.36396C17.7354 0.850341 19.7884 0 21.9289 0C26.3865 0 30 3.61354 30 8.07107C30 10.2116 29.1497 12.2646 27.636 13.7782L15.7071 25.7071C15.3166 26.0976 14.6834 26.0976 14.2929 25.7071L2.36396 13.7782C0.850339 12.2646 0 10.2116 0 8.07107Z" fill="#FF868E"/>
    </svg>;
    const dislike = <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15ZM15 2C7.8203 2 2 7.8203 2 15C2 22.1797 7.8203 28 15 28C22.1797 28 28 22.1797 28 15C28 7.8203 22.1797 2 15 2ZM10 12H8V10H10V12ZM22 12H20V10H22V12ZM7.6 20.2L8.2 19.4C11.6 14.8667 18.4 14.8667 21.8 19.4L22.4 20.2L20.8 21.4L20.2 20.6C17.6 17.1333 12.4 17.1333 9.8 20.6L9.2 21.4L7.6 20.2Z" fill="#FF868E"/>
    </svg>;
    const search = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.3613 18.2168L14.6012 13.2662C15.8251 11.8113 16.4957 9.98069 16.4957 8.07499C16.4957 3.62251 12.8732 0 8.4207 0C3.96821 0 0.345703 3.62251 0.345703 8.07499C0.345703 12.5275 3.96821 16.15 8.4207 16.15C10.0922 16.15 11.6851 15.6458 13.047 14.6888L17.8432 19.677C18.0436 19.8852 18.3133 20 18.6022 20C18.8757 20 19.1352 19.8957 19.3321 19.7061C19.7506 19.3034 19.764 18.6357 19.3613 18.2168ZM8.4207 2.10652C11.7118 2.10652 14.3892 4.78391 14.3892 8.07499C14.3892 11.3661 11.7118 14.0435 8.4207 14.0435C5.12961 14.0435 2.45222 11.3661 2.45222 8.07499C2.45222 4.78391 5.12961 2.10652 8.4207 2.10652Z" fill="#FF868E"/>
    </svg>



    const actHover = (bool,holderTxt) => {
        setIsHover({bool: bool,holderTxt: holderTxt})
    }
    const actFocus = (bool)=>{
        setIsFocus(bool)
    }
    const changeState = (isOpen) => {
        setIsNavBar(true)
        setCheckPage(isOpen)
    }
    const getSearchValue = () => {
        let searchInp = document.getElementById('search')
        setSearchValue(searchInp.value)
        changeState('search')
    }


    return(
        <div className={s.navContainer} >
            <div onMouseEnter={()=>actHover(true,'')} onMouseLeave={()=>actHover(false, holderTxt)}
                 className={isFocus?s.search+' '+s.searchFocus: (isHover.bool? s.search+' '+s.searchHover: s.search)}>
                <input type="search" id='search' placeholder={isHover.holderTxt}
                       onFocus={()=>actFocus(true)} onBlur={()=>actFocus(false)}
                       className={s.searchInput}/>
                <button  type='submit' className={s.searchBtn}>
                    <NavLink to='/search' onClick={getSearchValue} className={s.btnBG}>
                        {search}
                    </NavLink>
                </button>
            </div>
            <NavLink onClick={()=>changeState('like')} to='/like' className={checkPage=='like'?s.btnLike+' '+s.active:s.btnLike}>
                {like}
            </NavLink>
            <NavLink onClick={()=>changeState('fav')} to='/fav' className={checkPage=='fav'?s.btnFavourites+' '+s.active:s.btnFavourites}>
                {favourite}
            </NavLink>
            <NavLink onClick={()=>changeState('dislike')} to='/dislike' className={checkPage=='dislike'?s.btnDislike+' '+s.active:s.btnDislike}>
                {dislike}
            </NavLink>
        </div>
    )

}
export default NavBar;