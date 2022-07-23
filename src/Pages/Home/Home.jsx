import React, {useEffect, useState} from "react";
import s from './Home.module.css';
import vote_table from '../../images/vote-table.svg';
import pet_breeds from '../../images/pet-breeds.svg';
import images_search from '../../images/images-search.svg';
import Plug from "./Plug/Plug";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import Voting from "./Voting/Voting";
import Breeds from "./Breeds/Breeds";
import Gallery from "./Gallery/Gallery";
import NavBar from "./NavBar/NavBar";
import SelectedImage from "./Breeds/SelectedInfo/SelectedImage";
import Flickity from "flickity";
import Modal from "./Gallery/Upload/Modal";
import Dislikes from "./NavBar/Dislikes/Dislikes";
import Favourites from "./NavBar/Favourites/Favourites";
import Search from "./NavBar/Search/Search";
import Likes from "./NavBar/Likes/Likes";



const Home = () => {
    const [btnActive1, setBtnActive1] = useState(false);
    const [btnActive2, setBtnActive2] = useState(false);
    const [btnActive3, setBtnActive3] = useState(false);
    const [data,setData] = useState(null)//state from Api
    const [dataPhotoById,setDataPhotoById] = useState(null)//state other photo
    const [currentId, setCurrentId] = useState({id: null, url: null, breedId: null})
    const [cheackBreed, setCheackBreed] = useState('all')
    const [voteResponses, setVoteResponses] = useState(null)
    const [favResponses, setFavResponses] = useState(null)
    const [isModal,setIsModal] = useState(false)
    const [checkPage,setCheckPage] = useState(null)
    const [isNavBar,setIsNavBar] =useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [isData,setIsData] = useState(null)

    const [nav,setNav] = useState(false)
    const getActive1 = (btn1) => {
        setBtnActive1(btn1)
        setNav(btn1)
        return btnActive1
    }
    const getActive2 = (btn2) => {
        setBtnActive2(btn2)
        setNav(btn2)
        return btnActive2
    }
    const getActive3 = (btn3) => {
        setBtnActive3(btn3)
        setNav(btn3)
        return btnActive3
    }
    const [arrHover,setArrHover] = useState([false,false,false]);
    const hover = (hoverActive1,hoverActive2,hoverActive3) => {
        setArrHover([hoverActive1,hoverActive2,hoverActive3])
        return arrHover;
    }

    useEffect(()=>{
        if (btnActive1||btnActive2||btnActive3){
            setCheckPage('')
        }
    },[btnActive1,btnActive2,btnActive3])



    const flick = ()=>{
        let flkty = new Flickity('.main-carousel', {
            prevNextButtons: false
        });
        let dots = document.querySelector('.flickity-page-dots')
        let main = document.querySelector('.main-carousel')
        let Wmain = main.offsetWidth
        let Wdots = dots.offsetWidth/2
        let Right = Wmain/2 - Wdots
        dots.style.right= `${Right}px`;
    }

    return(
        <BrowserRouter>
            <div className={s.mainDiv}>
                <div className={s.displayGrid}>
                    <div className={s.leftContainer}>
                        <div className={s.functionalContainer}>
                            <NavLink className={s.navlinkLogo} to='/intern_test/'>
                                <div className={s.logo}></div>
                            </NavLink>
                            <div className={s.widgetContainer}>
                                <h1>Hi intern!</h1>
                                <h3>Welcome to MI 2022 Front-end test</h3>
                                <div className={s.widgetBox}>
                                    <h2>Lets start using The Cat API</h2>
                                    <div className={s.widgetCards}>
                                        <div className={s.widgetCard}>
                                            <div className={arrHover[0]? s.widgetBG+" "+s.widgetBGhover: (btnActive1? s.widgetBG+" "+s.widgetBGborder:s.widgetBG)}>
                                                <img src={vote_table}/>
                                            </div>
                                            <NavLink to="/voting" className={({isActive})=> getActive1(isActive) ? s.active: s.widgetBtn}
                                            onMouseEnter={()=>hover(true,false,false)} onMouseLeave={()=>hover(false,false,false)}>
                                                    <span className={btnActive1? s.textBtnActive:s.textBtn}>
                                                        VOTING
                                                    </span>
                                            </NavLink>
                                        </div>
                                        <div className={s.widgetCard}>
                                            <div className={arrHover[1]? s.widgetBG+" "+s.widgetBGhover: (btnActive2? s.widgetBG+" "+s.widgetBGborder:s.widgetBG)}>
                                                <img src={pet_breeds}/>
                                            </div>
                                            <NavLink to="/breeds" className={({isActive})=> getActive2(isActive) ? s.active: s.widgetBtn}
                                                     onMouseEnter={()=>hover(false,true,false)} onMouseLeave={()=>hover(false,false,false)}>
                                                    <span className={btnActive2? s.textBtnActive:s.textBtn}>BREEDS</span>
                                            </NavLink>
                                        </div>
                                        <div className={s.widgetCard}>
                                            <div className={arrHover[2]? s.widgetBG+" "+s.widgetBGhover: (btnActive3? s.widgetBG+" "+s.widgetBGborder:s.widgetBG)}>
                                                <img src={images_search}/>
                                            </div>
                                            <NavLink to="/gallery" className={({isActive})=> getActive3(isActive) ? s.active: s.widgetBtn}
                                                     onMouseEnter={()=>hover(false,false,true)} onMouseLeave={()=>hover(false,false,false)}>
                                                    <span className={btnActive3? s.textBtnActive:s.textBtn}>GALLERY</span>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.rightContainer}>
                        <div className={s.navBarContainer}>
                            {(btnActive1==true && isModal!=true)||
                            (btnActive2==true && isModal!=true)||
                            (btnActive3==true && isModal!=true) ||
                            (btnActive1,btnActive2,btnActive3==false && isNavBar==true)
                                ? <NavBar checkPage={checkPage} setCheckPage={setCheckPage} setIsNavBar={setIsNavBar}
                                          setSearchValue={setSearchValue} />:''}
                        </div>

                        <Routes>
                            <Route path='/gallery/upload' element={<Modal setIsModal={setIsModal}/>}></Route>
                            <Route path="/intern_test/" element={<Plug setIsNavBar={setIsNavBar} />}></Route>
                            <Route path="/voting"  element={<Voting voteResponses={voteResponses} setVoteResponses={setVoteResponses}
                                                                    favResponses={favResponses} setFavResponses={setFavResponses}/>}></Route>
                            <Route path="/breeds" element={<Breeds data={data} setData={setData}
                                                                   dataPhotoById={dataPhotoById}
                                                                    setDataPhotoById={setDataPhotoById}
                                                                   currentId={currentId} setCurrentId={setCurrentId} cheackBreed={cheackBreed} setCheackBreed={setCheackBreed}
                                />}></Route>
                            <Route path="/gallery" element={<Gallery data={data} setData={setData} setIsModal={setIsModal}/>}></Route>
                            <Route path="/breeds/image" element={<SelectedImage  data={data} setData={setData} setDataPhotoById={setDataPhotoById}
                                                                                dataPhotoById={dataPhotoById} currentId={currentId} flick={flick} cheackBreed={cheackBreed}
                            />}></Route>
                            <Route path='/dislike' element={<Dislikes checkPage={checkPage} setIsNavBar={setIsNavBar}
                            isData={isData} setIsData={setIsData}/>}></Route>
                            <Route path='/like' element={<Likes checkPage={checkPage} isData={isData} setIsData={setIsData} />}></Route>
                            <Route path='/fav' element={<Favourites checkPage={checkPage}  />}></Route>
                            <Route path='/search' element={<Search checkPage={checkPage} searchValue={searchValue} />}></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    )

}
export default Home;