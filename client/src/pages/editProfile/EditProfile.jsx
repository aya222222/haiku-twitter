import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {AiFillPicture} from 'react-icons/ai';
import { updateProfile, createProfile } from '../../features/profile/profileSlice';
import profileImage from '../../img/profileImg.jpg';
import cover from '../../img/cover.jpg';
// import LeaveProfileModal from '../../components/leaveProfileModal/LeaveProfileModal'
import DeleteAlertModal from '../../components/deleteAlertModal/DeleteAlertModal';
import './EditProfile.css'
import FileBase from 'react-file-base64';

const EditProfile = ({ 
  setOpenProfileModal, openProfileModal,
}) => {

const dispatch = useDispatch();


const [openAlertModal, setOpenAlertModal] = useState(false);
const [editProfileFlag, setEditProfileFlag] =  useState(false);

const user = JSON.parse(localStorage.getItem('profile'));

const effectRan = useRef(false);
const profileIconRef = useRef();
const profileBgRef = useRef();

//use profileData from getProfile()
const existingProfile = useSelector((state) => state.profile) ;
const profileId = existingProfile._id ;
console.log('profile id in edit is  ' + profileId)
// const loggedInUser = useSelector((state) => state.profileReducer?.userId == userId );

console.log('profile is '  + JSON.stringify(existingProfile))

const loggedInUserName = user?.result?.username || user?.result?.given_name

console.log('loggedInUserName ' + loggedInUserName)
// const post = useSelector((state) => currentId ? state.postsReducer.find((post) => post._id === currentId) : null);
console.log('username is ' + loggedInUserName)
const [profileData, setProfileData] = useState({
   bio: '',
   profileBgImg: '',
   profileIconImg:'',
   username: loggedInUserName
})

// const [profileId, setProfileId] = useState(null);

useEffect(() => {
  if(effectRan.current === false){
  if(profileId){
   
    console.log('existingprofile' + JSON.stringify(existingProfile));
    console.log('id is ' + profileId)
    // const {bio, profileBgImg, profileIconImg} = {...existingProfile};
    // setProfileData({bio, profileBgImg, profileIconImg});
    setProfileData(existingProfile);
    // setProfileId(existingProfile?._id);


  } else{
    console.log('no profile')
  }
  return () => effectRan.current = true;
 
}
}, [dispatch, profileId]);


const handleSubmit = async (e) => {
  e.preventDefault()
  console.log('dispatch')
  
  //update profile
  if(profileId){
    dispatch(updateProfile({profileId, profileData}));
    
   console.log('edited!!' + profileId)
   }else{
    console.log('createprofile dispatched')
    dispatch(createProfile(profileData));
   }
   
   setOpenProfileModal(false)

 }



const clickOutSide = (e) => {
if(e.target == e.currentTarget) {
  checkTextExists();

 
}
}
  //if haiku modal form is empty, 
  let values = Object.values(profileData);
  let emptyValues = values.every((value) => value == '');

//if you click close btn or outside of haiku modal
const checkTextExists = () => {

  //if currentId doesn't exist and and form is not empty, open confirm modal
  if(!profileId){
 
    for(let key in profileData){
    
      if(profileData[key] != '') {
         setOpenAlertModal(true);
    }
  }
   //if nothing is input, close modal
  if(emptyValues) setOpenProfileModal(false)
  //if currentId exsits
}else if(profileId) {
  //if post is not edited, close the haiku modal
  if(!editProfileFlag){

    setOpenProfileModal(false);
 
    // if post is edited, open confirm modal
  }else{
    setOpenAlertModal(true);
  }
}
}

  //invoked when click 'yes' to  leave modal without save it
  const handleCloseModal = ()=>{
 
    setOpenAlertModal(false);
    setOpenProfileModal(false);

  }  


  const onImageChange = (e, setProfileData) => {
    console.log('invoked')
    if(e.target.files && e.target.files[0]){
      let img = e.target.files[0];
      console.log('image is ' + img)
       console.log('target name is ' + e.target.name)
       console.log('target is ' + e.target)
      //create filereader and convert img to url
      const reader = new FileReader();
      reader.readAsDataURL(img);
  
      reader.onloadend = () => {
        setProfileData({...profileData, [e.target.name] : reader.result })
       
      }
    }
  }

  if(openProfileModal) return (
    <>
    <div className='fixed z-10 left-0 top-0 h-screen w-full overflow-auto bg-slate-600 bg-opacity-50 '  
    onClick={
      (e) => { clickOutSide(e) }}>
    <form
     method="post"
     className="w-1/2 my-5 mx-auto rounded-3xl bg-bg-color overflow-x-clip
                     p-5 relative">
    <span className="fa-solid fa-xmark absolute right-[15px] top-[10px] cursor-pointer text-white hover:text-slate-500"   
       onClick={
      (e)=>{ checkTextExists();}}></span>
        <h1>Edit Profile</h1>
      <div className="editProfileImg relative flex flex-col items-center justify-center">
      {/* profileImg profileBgImg */}
       <div className=" relative bg-card-color 
                        w-full h-[300px] flex justify-center items-center rounded-3xl">
        <AiFillPicture 
           onClick={() => profileBgRef.current.click()}
          //  photo 
           className="absolute text-4xl z-20 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-50 hover:text-slate-500 cursor-pointer"
        />
        
        {/* <img src={profileData.profileBgImg.image} alt="" /> */}
        {/* fileBaseContainer */}
        <div className=" absolute left-[49%] -translate-y-1/2 -translate-x-1/2
                        opacity-0 z-50 w-[50px] cursor-pointer" >
          {/* <input type="file" name="profileBgImg" ref={profileBgRef}
           onChange={(e) => {onImageChange(e, setProfileData, profileBgImg)}}
          /> */}
         <input
            ref={profileIconRef}
             
            name="profileBgImg"
            // fileBase 
            className="inline-block w-full cursor-pointer z-50"
            type="file"
            onChange={(e) => 
            {
           
              onImageChange(e, setProfileData);

              setEditProfileFlag(true)
          }}
            />
        </div>
         {profileData?.profileBgImg && (
          // previewProfileBgImg
          <div className=" absolute w-full h-full top-0">
            <span className="fa-solid fa-xmark absolute right-[10px] top-[5px] z-10 hover:text-slate-500 cursor-pointer"  
             onClick={(e) => {
              
              setProfileData({...profileData, profileBgImg:''});
              setEditProfileFlag(true)
          }
           }></span>
           {  profileData.profileBgImg ? <img className="w-full absolute rounded-3xl h-full object-cover object-[50% 25%]" src={profileData.profileBgImg}/> : null} 
          </div>
         )}
        </div> 
        {/* profileImg profileIconImg */}
        <div className="absolute bg-card-color border-solid border border-slate-700
                         h-[150px] w-[150px]  rounded-full left-1/2 -bottom-1/2  -translate-y-1/2 -translate-x-1/2">
        <AiFillPicture 
           onClick={() => profileIconRef.current.click()}
           className="inline-block z-20 text-4xl cursor-pointer top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 absolute opacity-50  hover:text-slate-600" />
        {/* <img src={profileData.profileIconImg.image} alt="" /> */}
        {/* fileBaseContainer */}
        <div className=" cursor-pointer opacity-0  absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2  z-50 w-[50px]"  >
          {/* <input type="file" name="profileIconImg" ref={profileIconRef}
           onChange={(e) => {onImageChange(e, setProfileData, profileIconImg);
          console.log(profileIconImg)}}
          /> */}
            <input
              ref={profileBgRef}
              
              name="profileIconImg" 
              className="fileBase inline-block  w-full cursor-pointer z-50"
              type="file"
          
              onChange={(e) => 
              {
             
                onImageChange(e, setProfileData);
  
                setEditProfileFlag(true)
            }}
            />
        </div>
        {profileData.profileIconImg && (
          // previewProfileIconImg 
          <div className="absolute rounded-full w-full h-full left-1/2 -bottom-1/2 -translate-y-1/2 -translate-x-1/2">
            <span className="fa-solid fa-xmark absolute w-[20px] top-[60%] right-[-14%] z-20 hover:text-slate-500 cursor-pointer"  
             onClick={(e) => {
              setProfileData({...profileData, profileIconImg:''});
              setEditProfileFlag(true)
          
          }
           }></span>
           
           { profileData.profileIconImg ? <img className="w-full h-full rounded-full absolute object-cover z-10 left-1/2 -bottom-1/2 -translate-y-1/2 -translate-x-1/2 inline-block" src={profileData.profileIconImg}/> : null} 
          </div>
         )}
        </div>  
      </div>
      {/* profileDetail */}
      <div className="mt-24 w-full flex flex-col gap-4">
        <div className="editName">
            <h4>User Name</h4>
            <input 
             required 
             type="text" 
             className="textInput w-full p-2.5 outline-none border-none rounded-md bg-card-color mt-1" 
             value={user?.result?.username || user?.result?.name}
             
             />
        </div>
        <div className="editBio">
            <h4>Bio</h4>
            <textarea 
              className="textInput w-full p-2.5 outline-none border-none rounded-md bg-card-color mt-1" 
              value={ profileData.bio }
              onChange={(e) => {
                setProfileData({...profileData, bio:e.target.value})
                setEditProfileFlag(true)
               }
              }
              name="bio" 
              id="" cols="30" rows="10"

            ></textarea>
        </div>
        {/* saveBtnSection */}
        <div className='ml-auto'>
        {/* button postBtn  */}
            <button 
            type="submit"
            className='rounded-3xl bg-border-color 
                              text-bg-color px-2.5 py-1 w-[70px]
                              border-none outline-none  
                              transition-all ease-out duration-200
                              cursor-pointer 
                              hover:text-white
                              hover:outline-2  hover:outline-solid hover:outline-slate-200
                              hover:bg-bg-color'
             onClick={(e)=>handleSubmit(e)}
            >SAVE</button>
        </div>
      </div>
   
    </form>
    </div>
    {openAlertModal  && (
      // Modal
       <div className=' fixed z-10 left-0 top-0 h-screen w-full overflow-auto bg-slate-600 bg-opacity-50'>
       <div className="deleteAlertModalInner bg-bg-color pt-[10px] pr-[15px] pb-[25px] pl-[15px] w-[25%] top-1/2 left-1/2 relative
                         -translate-y-1/2 -translate-x-1/2 rounded-md ">
       <span className="fa-solid fa-xmark hover:text-slate-500 absolute right-[10px] top-[6px] "  onClick={(e) => setOpenAlertModal(false) }></span>
       {/* deleteAlertModalSection */}
       <div className=" flex flex-col items-center gap-4 mt-4">
       <h4>Do you really want to leave without save it? </h4>
     <div className="alertBtnSection flex gap-[10px]">
     {/* button deleteBtn */}
     <button className=' rounded-3xl bg-bg-color
                      text-border-color px-4 py-2 
                      border-none outline-none  text-xl
                      transition-all ease-out duration-200
                      cursor-pointer 
                      hover:text-white
                      hover:outline-2  hover:outline-solid hover:outline-slate-200
                      hover:bg-bg-color w-24' 
      onClick={handleCloseModal}
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

export default EditProfile