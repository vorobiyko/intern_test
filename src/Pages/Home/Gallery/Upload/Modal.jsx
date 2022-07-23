import React, {useEffect, useState} from "react";
import s from './Modal.module.css'
import {NavLink} from "react-router-dom";
import axios from "axios";

const Modal = ({setIsModal}) => {
    const exit = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.05691 8.99997L0.52832 1.47137L1.47113 0.528564L8.99972 8.05716L16.5283 0.528564L17.4711 1.47137L9.94253 8.99997L17.4711 16.5286L16.5283 17.4714L8.99972 9.94278L1.47113 17.4714L0.52832 16.5286L8.05691 8.99997Z" fill="#FF868E"/>
    </svg>
    const BG = <svg className={s.BG} width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M140 40C128.954 40 120 48.9543 120 59.9999C120 71.0456 128.954 79.9999 140 79.9999C151.046 79.9999 160 71.0456 160 59.9999C160 48.9543 151.046 40 140 40Z" fill="#F8F8F7"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 20C0 8.9543 8.9543 0 20 0H180C191.046 0 200 8.9543 200 20V180C200 181.38 199.86 182.729 199.594 184.031C199.199 185.958 198.528 187.784 197.623 189.465C194.247 195.737 187.621 200 180 200H20C8.95431 200 0 191.046 0 180V20ZM64.6564 41.8952L60 37.2387L13.3333 83.9054V20C13.3333 16.3181 16.3181 13.3333 20 13.3333H180C183.682 13.3333 186.667 16.3181 186.667 20V133.333H156.095L64.7145 41.9526C64.6953 41.9333 64.6759 41.9142 64.6564 41.8952Z" fill="#F8F8F7"/>
    </svg>
    const iconGood = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM10 1.33333C5.21353 1.33333 1.33333 5.21353 1.33333 10C1.33333 14.7865 5.21353 18.6667 10 18.6667C14.7865 18.6667 18.6667 14.7865 18.6667 10C18.6667 5.21353 14.7865 1.33333 10 1.33333ZM15.1872 7.08313L9.42904 14.2809L4.90654 10.5121L5.76012 9.48785L9.23763 12.3858L14.1461 6.2502L15.1872 7.08313Z" fill="#97EAB9"/>
    </svg>
    const iconBad = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM10 1.33333C5.21353 1.33333 1.33333 5.21353 1.33333 10C1.33333 14.7865 5.21353 18.6667 10 18.6667C14.7865 18.6667 18.6667 14.7865 18.6667 10C18.6667 5.21353 14.7865 1.33333 10 1.33333ZM9.05719 10L5.5286 6.4714L6.4714 5.5286L10 9.05719L13.5286 5.5286L14.4714 6.4714L10.9428 10L14.4714 13.5286L13.5286 14.4714L10 10.9428L6.4714 14.4714L5.5286 13.5286L9.05719 10Z" fill="#FF868E"/>
    </svg>



    const [isDrag,setIsDrag] = useState({
        drag_over: false,
        drop: false
    })
    const [isFile, setIsFile] = useState(null)
    const [info,setInfo] = useState(null)
    let imgname = 'No file selected';
    const [imgName,setImgName] = useState(imgname)

    const reader = new FileReader();
    const FileDragHover = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsDrag({drag_over: true,drop: false})
        setInfo(null)
        setImgName(imgname)


    }
    const FileSelectHadler = (e) => {
        FileDragHover(e);
        setIsDrag({drag_over: false,drop: true})
        let divDrop = document.getElementById('dropZone')
        divDrop.style.background = 'white'
        divDrop.style.border = '2px dashed #FBE0DC'
        let files = e.target.files || e.dataTransfer.files
        reader.readAsDataURL(files[0])
        reader.addEventListener('load',ev => {
          createImg(ev)
        })
        ParseFile(files[0]);

    }


    const ParseFile = (file) => {
        if (file!=null){
            setImgName('Image File Name: '+ file.name)
            setIsFile(file)

        }
    }
    const createImg = (e) => {
        if (e!=null) {
            let im = document.getElementById('imgg')
            im.src = e.target.result
        }

    }
    axios.defaults.headers.common['x-api-key'] = "9bda40e4-0dfe-4b4e-bba3-db56f391102f"
    const uploadRequest = async () => {
        let btnUpload = document.getElementById('btn-upload')
        let loader = document.getElementById('loader')
        loader.style.display = 'block'
        btnUpload.style.pointerEvents = 'none'
        if (isFile!=null){
            let formData = new FormData();
            formData.append('file', isFile);

            let response = await axios.post('https://api.thecatapi.com/v1/images/upload',
                    formData
            ,{headers: {'Content-Type':'multipart/form-data' },params: {sub_id: 'eevanesens'}}
            ).then((e)=>loadImageAnalis(e.data.id))
                .then(()=>{
                    loader.style.display = 'none'
                    btnUpload.style.pointerEvents = 'auto'
                })
                .catch((e)=>{
                    if(e.response.data.message == 'Classifcation failed: correct animal not found.'){
                        setInfo({text:'No Cat found - try a different one',icon: iconBad});
                        let divDrop = document.getElementById('dropZone')
                        btnUpload.style.display = 'none'
                        divDrop.style.background = '#FBE0DC'
                        divDrop.style.border = '2px dashed #FF868E'
                    }
                })
        }
    }
    const loadImageAnalis = async (id) => {
            let response = await axios.get('https://api.thecatapi.com/v1/images/'+id+"/analysis")
                .then((e)=>(e.data!=null)?setInfo({text: 'Thanks for the Upload - Cat found!', icon: iconGood}):setInfo('Choose any photo'))
                .then(()=> setIsFile(null))
                .then(()=>setIsDrag({drag: false, drag_over: false}))
    }
    return(
        <div className={s.backGround} >
            <NavLink to='/gallery' className={s.closewind} onClick={()=>setIsModal(false)}>

            </NavLink>
            <div className={s.mainWindow} id='modal'>
                <div className={s.firstRow}>
                    <NavLink to='/gallery' className={s.exit} onClick={()=>setIsModal(false)}>
                        {exit}
                    </NavLink>
                </div>
                <div className={s.secondRow}>
                    <h1>Upload a .jpg or .png Cat Image</h1>
                </div>
                <div className={s.thirdRow}>
                    <h3>Any uploads must comply with the <a href='https://thecatapi.com/privacy' target='_blank'>upload guidelines</a> or face deletion.</h3>
                </div>

                <div accept=".jpg, .jpeg, .png" className={((isDrag.drag_over)?s.dropContainer+' '+s.hover:((isDrag.drop)?s.dropContainer+' '+s.drop:s.dropContainer))} id='dropZone'
                onDrop={event =>  FileSelectHadler(event)} onDragOver={e => FileDragHover(e)}
                >
                    <input type="file" accept=".jpg, .jpeg, .png" onChange={event => FileSelectHadler(event)}  className={s.fileInput}/>
                    {BG}
                    <img id='imgg'/>
                    <div className={s.textBox}>
                        <h3 style={{color: 'black',fontWeight: "500",margin: '6px'}}>Drag here </h3>
                        <h3> your file or </h3>
                        <h3 style={{color: 'black',fontWeight: "500",margin: '6px'}}> Click here </h3>
                        <h3> to upload</h3>
                    </div>
                </div>
                <div className={s.link}>
                    <h3 id='nameFile'>{imgName}</h3>
                </div>
                <div className={s.btnUploadPhoto} id='btn-upload' onClick={uploadRequest}
                     style={(isDrag.drop&&isFile!=null)?{display: 'flex'}:{display: 'none'}}>
                    <svg className={s.spinner} id='loader' viewBox="0 0 16 16">
                        <circle className={s.path} cx="8" cy="8" r="6" fill="none" stroke-width="2"></circle>
                    </svg>
                    <h5>UPLOAD PHOTO</h5>
                </div>
                <div className={s.infoAboutLoad} style={info==null?{display: 'none'}:{display: 'flex'}}>
                    {info==null?'':info.icon}
                    <h4>{info==null?'':info.text}</h4>
                </div>
            </div>

        </div>
    )

}
export default Modal;