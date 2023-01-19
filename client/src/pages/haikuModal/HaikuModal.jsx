import React, {useState, useEffect, useRef} from 'react'

import './HaikuModal.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../../features/posts/postsSlice';

import DeleteAlertModal from '../../components/deleteAlertModal/DeleteAlertModal';
import FileBase from 'react-file-base64';

const HaikuModal = ({
   setOpenHaikuModal, openHaikuModal,
   currentId, setCurrentId,
   editFlag, setEditFlag
}) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const post = useSelector((state) => currentId ? state.posts.posts.find((post) => post._id === currentId) : null);
  const existingProfile = useSelector((state) => state.profile);
  
  const [postData, setPostData] = useState({

    text: '',
    tags: '',
    selectedFile: ''
  })
  
  console.log('pic is ' + existingProfile.profileIconImg)
  //if haiku modal form is empty, 
  let values = Object.values(postData);
  let emptyValues = values.every((value) => !value.match(/\S/g));


  // const [openHaikuModal, setOpenHaikuModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [clear, setClear] = useState(false);
  const username = user?.result?.username || user?.result?.name;
  // const [inputFlag, setInputFlag] = useState(false);
  // const haiku = useSelector((state) => state.haiku.haiku);
  const dispatch = useDispatch();
  const effectRan = useRef(false);
  
  const navigate = useNavigate();
  useEffect(() => {
    
    if(effectRan.current === false){
    //if you click edit button
    if(currentId){
      console.log(currentId)
      setPostData(post);
      setEditFlag(false);
     
    }
    //if you click create button
    else{
      console.log(currentId)
      // clearInput();
    }
  }

  return () => effectRan.current = true;

  }, [post]);
 
  const handleSubmit =  (e) => {
   e.preventDefault();
   
   //edit post
   if(currentId){
    dispatch(updatePost( {currentId, postData:{...postData, username, profileIconImg: existingProfile.profileIconImg} }));
   
    navigate('/');
    
  
   }else{
    //create post
    dispatch(createPost({...postData, username, profileIconImg: existingProfile.profileIconImg }));
     navigate('/');
   }
   
   setCurrentId(null);
   clearInput();
   setOpenHaikuModal(false);
  }
  // const deleteInputs = () => {
  //   setPostData({
  //     creator:'',
  //     text: '',
  //     tags: '',
  //     selectedFile: ''
  //   });
    
  //   // setInputFlag(false)
  //   //close confirmModal
  //   setOpenAlertModal(false)
  // }

  //clear inputs
  const clearInput = () => {
    
    // if(currentId){
    //   setCurrentId(null);
    // }
    // if(editFlag){
    //   setEditFlag(false);
    // }
   
    setPostData({
  
      text: '',
      tags: '',
      selectedFile: ''
    });


  }

 //if you click close btn or outside of haiku modal
  const checkTextExists = () => {

    if(!currentId){
      //if currentId doesn't exist and and form is not empty, open confirm modal
      if(!emptyValues) {

        setOpenAlertModal(true);
        
      }
     
    if(emptyValues) setOpenHaikuModal(false)
    //if currentId exsits
  }else if(currentId) {
    //if post is not edited, close the haiku modal
    if(!editFlag){
      console.log(currentId)
      console.log(editFlag)
      setOpenHaikuModal(false);
      setCurrentId(null);
      // if post is edited, open confirm modal
    }else{
      console.log(currentId)
      console.log(editFlag)
      setOpenAlertModal(true);
    }
   
  }
  setClear(false);
  }

  const checkEditing = () => {
    if(currentId){
      setEditFlag(true);
      console.log('edited')
    }
  }

  
 const clickOutSide = (e) => {
  if(e.target == e.currentTarget) {
    checkTextExists();
   
  }
  }

  //invoked when click 'yes' to clear all or leave haiku modal
  const handleClearOrCloseModal = ()=>{
    clearInput();
  
    setOpenAlertModal(false);
    console.log('clicked yes')
    if(!clear) {
      if(currentId){
      setCurrentId(null);
      }
      setOpenHaikuModal(false);
      console.log('this is cleared')
    }
  
    setClear(false);
  }

  
  const onImageChange = (e, setPostData) => {
    if(e.target.files && e.target.files[0]){
      let img = e.target.files[0];
     
       //create filereader and convert img to url
       const reader = new FileReader();
       reader.readAsDataURL(img);
   
       reader.onloadend = () => {
         setPostData({...postData, [e.target.name] : reader.result })
        
       }
     
    }

  }

   if(openHaikuModal && existingProfile) return (
   
    <>
    {/* Modal  */}
     < div className='fixed z-10 left-0 top-0 h-screen w-full overflow-auto bg-slate-600 bg-opacity-50' 
          onClick={(e) => { clickOutSide(e) } }>
     {/* modalInner */}
        <div className=" w-[28%] bg-bg-color pt-[10px] pr-[25px] pb-[25px] pl-[25px]
                         top-1/2 left-1/2 relative -translate-x-1/2 -translate-y-1/2 
                         rounded-3xl">
        <span className="fa-solid fa-xmark  absolute right-[15px] top-[10px] cursor-pointer text-white hover:text-slate-500"  
        onClick={(e) => {
          console.log('invoked')
          checkTextExists();
          
          }
           }></span>
           {/* haikuSection */}
        <div className=" flex flex-col justify-center items-center gap-7 mt-[25px]">
          {/* <input type="text" className='textInput creator' name="creator"
          value={postData.creator}
          placeholder="creator"
          onChange={(e) => {
            setPostData({...postData, creator:e.target.value})
            checkEditing()
          }}
          /> */}
{/* textInput */}
        <textarea className=" w-full p-2.5 outline-none border-none rounded-md bg-card-color "name="haiku-text"
         value={postData.text}
         onChange={
          (e) => {
          setPostData({...postData, text:e.target.value})
          checkEditing();
         
        }} 
         id="" cols="30" rows="10"placeholder='post haiku'
         >{postData.text}        
         </textarea>
         {/* textInput mb-[25px] h-[30px] */}
         <input type="text" className=' w-full h-[30px] p-2.5 outline-none border-none rounded-md bg-card-color ' name="tags"
          value={postData.tags}
          placeholder="tags"
          onChange={(e) => 
            {
            setPostData({...postData, tags:e.target.value.split(',')});
            checkEditing();
            console.log(editFlag)
           
          }}
          />
          {/* fileBase  */}
          <div className='mr-auto'>
          <input
            style={{alignSelf: 'flex-start'}}
            type="file"
            name="selectedFile"
         
            onChange={(e) => 
            { 
              onImageChange(e, setPostData)
              checkEditing();
          }}
            />
            </div>
            {/* haikuBtn  */}
         <div className="flex gap-4">
         {/* postBtn button  */}
         <button className='rounded-3xl bg-border-color 
          text-bg-color px-2.5 py-1 w-[70px]
          border-none outline-none  
          transition-all ease-out duration-200
          cursor-pointer 
          hover:text-white
          hover:outline-2  hover:outline-solid hover:outline-slate-200
          hover:bg-bg-color' 
          disabled={ emptyValues ? true : false}
          onClick={handleSubmit}>POST</button>    
          {/* deleteBtn button  */}
         <button className='rounded-3xl 
          text-border-color px-2.5 py-1 w-[70px]
          border-none outline-none  
          transition-all ease-out duration-200
          cursor-pointer 
          hover:text-white
          hover:outline-2  hover:outline-solid hover:outline-slate-200
          hover:bg-bg-color' 
          disabled={emptyValues ? true: false}
          // disabled={ !setInputFlag ? true : false}
          onClick={()=> {
          setOpenAlertModal(true)
          setClear(true);
          }} >
          CLEAR
         </button>    
        </div>   
        </div>
        </div>
    </div>
   
          
    {openAlertModal  && (
      // Modal 
       <div className='fixed z-10 left-0 top-0 h-screen w-full overflow-auto bg-slate-600 bg-opacity-50'>
       {/* deleteAlertModalInner */}
       <div className=" bg-bg-color  px-[15px] py-[25px] w-1/4 left-1/2 top-1/2 relative -translate-y-1/2 -translate-x-1/2 rounded-md">
       <span className="fa-solid fa-xmark  absolute right-[10px] top-[7px] z-10  cursor-pointer hover:text-slate-500"  onClick={(e) => setOpenAlertModal(false) }></span>
       {/* deleteAlertModalSection  */}
       <div className="flex flex-col items-center opacity-100 gap-4">
       <h4>Do you really want to {clear? `clear all?` : `leave without save it?`} </h4>
       {/* alertBtnSection */}
     <div className=" flex gap-2.5">
     {/* button deleteBtn  */}
     <button className='rounded-3xl bg-bg-color
                                text-border-color px-4 py-2 
                                border-none outline-none  text-xl
                                transition-all ease-out duration-200
                                cursor-pointer 
                                hover:text-white
                                hover:outline-2  hover:outline-solid hover:outline-slate-200
                                hover:bg-bg-color w-24 ' 
      onClick={handleClearOrCloseModal}
       >
        YES
      </button>
      {/* button postBtn  */}
     <button className='rounded-3xl bg-border-color
                              text-bg-color px-4 py-2 
                              border-none outline-none  text-xl
                              transition-all ease-out duration-200
                              cursor-pointer 
                              hover:text-white
                              hover:outline-2  hover:outline-solid hover:outline-slate-200
                              hover:bg-bg-color w-24' 
      onClick={(e) => setOpenAlertModal(false)}>
        NO
     </button>
   </div>
 
       </div>
       </div>
     </div>
    )}
    </>
     
    
   )
  }      


export default HaikuModal