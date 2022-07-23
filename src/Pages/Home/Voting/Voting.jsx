import React, {useEffect, useState} from "react";
import s from './Voting.module.css'
import like from './../../../images/likeBtnWhite.svg'
import favourite from './../../../images/favouriteBtnWhite.svg'
import dislike from './../../../images/dislikeBtnWhite.svg'
import async from "async";
import axios from "axios";



const Voting = ({voteResponses,setVoteResponses,favResponses,setFavResponses}) => {
    const btnBack = <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.709994 10.9901L9.30969 19.5896C9.85669 20.1369 10.7437 20.1369 11.2905 19.5896C11.8373 19.0427 11.8373 18.1558 11.2905 17.6091L3.68104 9.99988L11.2902 2.39096C11.8371 1.84391 11.8371 0.957107 11.2902 0.410284C10.7434 -0.136761 9.85649 -0.136761 9.30949 0.410284L0.709774 9.00985C0.436354 9.28339 0.299805 9.64153 0.299805 9.99983C0.299805 10.3583 0.436624 10.7167 0.709994 10.9901Z" fill="#FF868E"/>
    </svg>
    const favourite = <svg width="30" height="26" viewBox="0 0 30 26" fill="black" xmlns="http://www.w3.org/2000/svg">
        <path className={s.fav} fill-rule="evenodd" clip-rule="evenodd" d="M8.07107 2C4.71811 2 2 4.71811 2 8.07107C2 9.68122 2.63963 11.2254 3.77817 12.364L15 23.5858L26.2218 12.364C27.3604 11.2254 28 9.68121 28 8.07107C28 4.71811 25.2819 2 21.9289 2C20.3188 2 18.7746 2.63963 17.636 3.77817L15.7071 5.70711C15.3166 6.09763 14.6834 6.09763 14.2929 5.70711L12.364 3.77818C11.2254 2.63963 9.68121 2 8.07107 2ZM0 8.07107C0 3.61354 3.61354 0 8.07107 0C10.2116 0 12.2646 0.850343 13.7782 2.36396L15 3.58579L16.2218 2.36396C17.7354 0.850341 19.7884 0 21.9289 0C26.3865 0 30 3.61354 30 8.07107C30 10.2116 29.1497 12.2646 27.636 13.7782L15.7071 25.7071C15.3166 26.0976 14.6834 26.0976 14.2929 25.7071L2.36396 13.7782C0.850339 12.2646 0 10.2116 0 8.07107Z" fill="#FFFFFF"/>
    </svg>

    const dislike = <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className={s.dlk} fill-rule="evenodd" clip-rule="evenodd" d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15ZM15 2C7.8203 2 2 7.8203 2 15C2 22.1797 7.8203 28 15 28C22.1797 28 28 22.1797 28 15C28 7.8203 22.1797 2 15 2ZM10 12H8V10H10V12ZM22 12H20V10H22V12ZM7.6 20.2L8.2 19.4C11.6 14.8667 18.4 14.8667 21.8 19.4L22.4 20.2L20.8 21.4L20.2 20.6C17.6 17.1333 12.4 17.1333 9.8 20.6L9.2 21.4L7.6 20.2Z" fill="#FFFFFF"/>
    </svg>
    const like = <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className={s.lk} fill-rule="evenodd" clip-rule="evenodd" d="M0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15ZM15 2C7.8203 2 2 7.8203 2 15C2 22.1797 7.8203 28 15 28C22.1797 28 28 22.1797 28 15C28 7.8203 22.1797 2 15 2ZM10 12H8V10H10V12ZM22 12H20V10H22V12ZM9.2 16.6L9.8 17.4C12.4 20.8667 17.6 20.8667 20.2 17.4L20.8 16.6L22.4 17.8L21.8 18.6C18.4 23.1333 11.6 23.1333 8.2 18.6L7.6 17.8L9.2 16.6Z" fill="#FFFFFF"/>
    </svg>
    const favouriteActive = <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.07107 0C3.61354 0 0 3.61354 0 8.07107C0 10.2116 0.850339 12.2646 2.36396 13.7782L14.2929 25.7071C14.6834 26.0976 15.3166 26.0976 15.7071 25.7071L27.636 13.7782C29.1497 12.2646 30 10.2116 30 8.07107C30 3.61354 26.3865 0 21.9289 0C19.7884 0 17.7354 0.850341 16.2218 2.36396L15 3.58579L13.7782 2.36396C12.2646 0.850343 10.2116 0 8.07107 0Z" fill="white"/>
    </svg>

    const [votindData,setVotingData] = useState(null)
    const [switcher,setSwitcher] = useState(0)
    const [isFavBtn,setIsFavBtn] = useState(false)
    axios.defaults.headers.common['x-api-key'] = "9bda40e4-0dfe-4b4e-bba3-db56f391102f"

    let arrLogs = [];
    useEffect(()=>{
        async.promise = axios.get("https://api.thecatapi.com/v1/images/search?limit=1&order=RANDOM")
            .then((img)=>setVotingData(img.data))
    },[switcher])
    const howBtnClick = (btn) => {
        if (btn!='favourite'){
            setIsFavBtn(false)
            votePost(btn)
            setSwitcher(switcher+1)
        }
        if (btn=='favourite') {
            setIsFavBtn(!isFavBtn)
            favPost(btn)
            favDelete()
        }
    }

    const creatImage = () => {
      if (votindData!=null){
          return <img id='im' className={s.img} src={votindData[0].url}/>
      }
    }
    const votePost = (btn)=>{
        if (votindData!=null){
            console.log('post request')
            async.promise = axios.post("https://api.thecatapi.com/v1/votes",
                {
                image_id: votindData[0].id,
                sub_id: "eevanesens",
                value: (btn =='like')?1:0
                })
        }
    }
    useEffect(()=>{
            console.log('get vote')
            async.promise = setTimeout(axios.get("https://api.thecatapi.com/v1/votes",
                {
                    params:{
                        sub_id: 'eevanesens'
                    }
                })
                .then(vote=>setVoteResponses(vote.data)).then(e=>console.log(e.data))
            ,300)

    },[switcher])
    const favPost =()=>{
        if (votindData!=null && isFavBtn==false){
            console.log('get post favorite')
            async.promise = axios.post('https://api.thecatapi.com/v1/favourites',
                {
                    image_id: votindData[0].id,
                    sub_id: "eevanesens"
                })
        }
    }
    const favDelete = () => {
        if (isFavBtn){
            console.log('delete')
            console.log(favResponses)
            async.promise = axios.delete(`https://api.thecatapi.com/v1/favourites/${favResponses[favResponses.length-1].id}` )
        }
    }

    useEffect(()=>{
            console.log('get favourite')
            async.promise = axios.get("https://api.thecatapi.com/v1/favourites?sub_id=eevanesens")
                .then(fav=>setFavResponses(fav.data))

    },[switcher,isFavBtn])

        let el = []
        if (favResponses!=null && voteResponses!=null){
            arrLogs = favResponses.concat(voteResponses)
            for (let i = 0; i < arrLogs.length; i++) {
                let arrValues = [];
                let arrTime = []
                let time = []
                arrValues[i] = arrLogs[i].value
                arrTime[i] = arrLogs[i].created_at
                time[i] = arrTime[i].slice(11,16)
                el[i] = <div className={s.sectionLog}>
                    <h4 className={s.dataLog}>{time[i]}</h4>
                    <h4>Image ID:</h4>
                    <h4 className={s.idLog}>{arrLogs[i].image_id}</h4>
                    <h4>{(arrValues[i] == undefined)?'was added to Favourites':((arrValues[i]==0)?"was added to Dislikes":'was added to Likes')}</h4>
                    <div className={s.iconLog}>
                        {(arrValues[i] == undefined)?favourite:((arrValues[i]==0)?dislike:like)}
                    </div>
                </div>
            }
        }

    return(
        <div>
            <div className={s.votingContent}>
                <div className={s.votingHeader}>
                    <div className={s.btnBack}>
                        {btnBack}
                    </div>
                    <div className={s.votingTitle}>
                        <h2>Voting</h2>
                    </div>
                </div>
                <div className={s.mainContent}>
                    <div className={s.windowImgBtn}>
                        <div className={s.votingImg}>
                            <div className={s.image}>
                                {creatImage()}
                            </div>
                        </div>
                        <div className={s.buttonsVoting}>
                            <div className={s.buttonLike} onClick={()=>howBtnClick('like')} >
                                {like}
                            </div>
                            <div className={s.buttonFavourite}
                                 onClick={()=>howBtnClick('favourite')}>
                                {(isFavBtn)?favouriteActive:favourite}
                            </div>
                            <div className={s.buttonDislike} onClick={()=>howBtnClick('dislike')}>
                                {dislike}
                            </div>
                        </div>
                    </div>
                    <div className={s.usersLogs}>
                        {el}
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Voting;