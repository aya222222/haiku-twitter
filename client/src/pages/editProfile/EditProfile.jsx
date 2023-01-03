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

  console.log('dispatch')
  
  //update profile
  if(profileId){
    dispatch(updateProfile(profileId, profileData));
    
   console.log('edited' + profileId)
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
    if(e.target.files && e.target.files[0]){
      let img = e.target.files[0];
      console.log('image is ' + img)

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
    <div className='Modal'  
    onClick={
      (e) => { clickOutSide(e) }}>
    <form className="EditProfile">
    <span className="fa-solid fa-xmark"   
       onClick={
      (e)=>{ checkTextExists();}}></span>
        <h1>Edit Profile</h1>
      <div className="editProfileImg">
       <div className="profileImg profileBgImg">
        <AiFillPicture 
           onClick={() => profileBgRef.current.click()}
           className="photo"
        />
        
        {/* <img src={profileData.profileBgImg.image} alt="" /> */}
        <div className="fileBaseContainer">
          {/* <input type="file" name="profileBgImg" ref={profileBgRef}
           onChange={(e) => {onImageChange(e, setProfileData, profileBgImg)}}
          /> */}
         <input
            ref={profileIconRef}
             
            name="profileBgImg"
            className="fileBase"
            type="file"
            onChange={(e) => 
            {
           
              onImageChange(e, setProfileData);

              setEditProfileFlag(true)
          }}
            />
        </div>
         {profileData?.profileBgImg && (
          <div className="previewProfileBgImg">
            <span className="fa-solid fa-xmark"  
             onClick={(e) => {
              
              setProfileData({...profileData, profileBgImg:''});
              setEditProfileFlag(true)
          }
           }></span>
           {  profileData.profileBgImg ? <img src={profileData.profileBgImg}/> : null} 
          </div>
         )}
        </div>
        <div className="profileImg profileIconImg">
        <AiFillPicture 
           onClick={() => profileIconRef.current.click()}
           className="photo" />
        {/* <img src={profileData.profileIconImg.image} alt="" /> */}
        <div className="fileBaseContainer"  >
          {/* <input type="file" name="profileIconImg" ref={profileIconRef}
           onChange={(e) => {onImageChange(e, setProfileData, profileIconImg);
          console.log(profileIconImg)}}
          /> */}
            <input
              ref={profileBgRef}
              
              name="profileIconImg" 
              className="fileBase"
              type="file"
          
              onChange={(e) => 
              {
             
                onImageChange(e, setProfileData);
  
                setEditProfileFlag(true)
            }}
            />
        </div>
        {profileData.profileIconImg && (
          <div className="previewProfileIconImg">
            <span className="fa-solid fa-xmark"  
             onClick={(e) => {
              setProfileData({...profileData, profileIconImg:''});
              setEditProfileFlag(true)
          
          }
           }></span>
           
           { profileData.profileIconImg ? <img src={profileData.profileIconImg}/> : null} 
          </div>
         )}
        </div>  
      </div>
      <div className="profileDetail">
        <div className="editName">
            <h4>User Name</h4>
            <input 
             required 
             type="text" 
             className="textInput" 
             value={user?.result?.username || user?.result?.name}
             
             />
        </div>
        <div className="editBio">
            <h4>Bio</h4>
            <textarea 
              className="textInput" 
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
        <div className='saveBtnSection'>
            <button className='button postBtn'
             onClick={(e)=>handleSubmit(e)}
            >SAVE</button>
        </div>
      </div>
   
    </form>
    </div>
    {openAlertModal  && (
       <div className='Modal'>
       <div className="deleteAlertModalInner">
       <span className="fa-solid fa-xmark"  onClick={(e) => setOpenAlertModal(false) }></span>
       <div className="deleteAlertModalSection">
       <h4>Do you really want to leave without save it? </h4>
     <div className="alertBtnSection">
     <button className='button deleteBtn' 
      onClick={handleCloseModal}
       >
        YES
      </button>
     <button className='button postBtn' 
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