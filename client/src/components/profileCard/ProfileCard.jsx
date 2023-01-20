import React, { useEffect } from 'react'
import  './ProfileCard.css'
import {AiFillPicture} from 'react-icons/ai';
import profileImage from '../../img/profileImg.jpg'
import cover from '../../img/cover.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import cameraIcon from '../../img/camera-icon.png'

import { getUserPosts } from '../../features/posts/postsSlice';
import { getCreatorProfile } from '../../features/creatorProfile/creatorProfileSlice'; 
import EditProfileBtn from '../editProfileButton/EditProfileBtn';

const ProfileCard = (
  {
  openProfileModal,  
  setOpenProfileModal, 
  setListOfFollowers, 
  listOfFollowers, 
  setListOfFollowing,
  listOfFollowing,
  listOfCreatorFollowers,
  setListOfCreatorFollowers,
  listOfCreatorFollowing, 
  setListOfCreatorFollowing
}) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?._id || user?.result?.sub
  // const loggedInUser = useSelector((state) => state.profileReducer?.userId == userId );
  const existingProfile = useSelector((state) => state.profile);
  console.log('existingprofile is '  + JSON.stringify(existingProfile))
  const username = user?.result?.username || user?.result?.name;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const id = userId;

  const fetchUserPosts =  () => {
    dispatch(getUserPosts({creator:userId, page:0}))
    dispatch(getCreatorProfile(userId))
    // console.log('posts creator is ' + post.creator);
    navigate(`/posts/${userId}`)
  }


  return (
    <div className='xl:text-sm text-xs rounded-3xl border-slate-500 border-solid border overflow-x-clip lg:block hidden '>
       

        <div className="relative flex flex-col items-center justify-center
          w-full  min-[1280px]:h-64 max-[1280px]:h-40 
        ">
 
  
         <div className="h-full w-full border-b border-solid 
         border-slate-500 flex justify-center items-center">
           {existingProfile?.profileBgImg ? 
           <img className="h-full w-full object-cover 
            border border-solid 
          border-slate-500"
            src={ existingProfile?.profileBgImg } alt="" /> 
           : 
           <img className="w-24 text-center" src={cameraIcon } alt="" /> }
         </div>
         
         <div className="xl:w-16 xl:h-16 h-12 w-12 rounded-full absolute left-2/4 top-full
           -translate-x-1/2 -translate-y-1/2  flex items-center 
          border border-solid border-slate-500
         ">
  
           {existingProfile?.profileBgImg ? 
           <img className="h-full w-full rounded-full object-cover" src={ existingProfile?.profileIconImg  } alt="" /> 
           : 
           <img className="w-5 m-auto" src={cameraIcon } alt="" /> }
         </div>

          
        </div>
 

       <EditProfileBtn
        setOpenProfileModal={setOpenProfileModal}
       />
        <div className="mt-8 mb-[5%] gap-1 flex flex-col justify-center items-center">
            <h4>{username}</h4>
            <p>{existingProfile?.bio ? existingProfile?.bio: ''}</p>
           
        </div>
        <div className='flex-grow border-t border-slate-500' />

        <div className="px-[5%] py-[5%] flex justify-around gap-1 text-center" >
            <div className="">
              {existingProfile?.follower?.length ? <Link to={`/posts/${userId}/follower`} style={{ textDecoration: 'none' }}
               onClick={
                ()=>{
                     setListOfFollowers(true);
                     setListOfFollowing(false);
                     setListOfCreatorFollowers(false);
                     setListOfCreatorFollowing(false);
                     fetchUserPosts()
                }
                
              }
          
              >
                <h4>{existingProfile?.follower?.length}</h4>
              </Link> : <h4>0</h4>
              }
                <p>{ existingProfile?.follower?.length >= 2 ? `followers` : `follower`}</p>
            </div>
      
            <div className="border-l border-solid border-slate-500"></div>
            <div className="">
              {existingProfile?.following?.length ? <Link to={`/posts/${userId}/following`} style={{ textDecoration: 'none' }}
               onClick={
                 () => {
                      setListOfFollowers(false);
                      setListOfFollowing(true);     
                      setListOfCreatorFollowers(false);
                      setListOfCreatorFollowing(false);  

                      fetchUserPosts()
                      }
                    }
              > 
                
                  <h4>{existingProfile?.following?.length}</h4>
              </Link> : <h4>0</h4>
              }   
                  <p>following</p>
            </div>
            <div className="border-l border-solid border-slate-500"></div>
            <div className="">
              {existingProfile?.totalPosts ? <Link to={`/posts/${userId}`} style={{ textDecoration: 'none' } } 
                onClick={fetchUserPosts}
              >
              <h4 >{ existingProfile?.totalPosts }</h4>
              </Link> : <h4>0</h4>

            }
                <p>posts</p>
            </div>
        </div>
      
    </div>
  )
}

export default ProfileCard