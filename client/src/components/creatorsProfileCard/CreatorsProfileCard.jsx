import React, { useEffect, useState, useRef } from 'react'
import  './CreatorsProfileCard.css'
import profileImage from '../../img/profileImg.jpg'
import cover from '../../img/cover.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getUserPosts } from '../../features/posts/postsSlice'
import { getProfile,followOrUnfollowCreator } from '../../features/profile/profileSlice'
import { updateCreatorFollowStatus } from '../../features/creatorProfile/creatorProfileSlice'


import FollowBtn from '../followBtn/FollowBtn'
import cameraIcon from '../../img/camera-icon.png'
import EditProfileBtn from '../editProfileButton/EditProfileBtn'

const CreatorsProfileCard = ({ 
    setListOfFollowers, 
    setListOfFollowing,
    listOfFollowers,
    listOfCreatorFollowers,
    setListOfCreatorFollowers,
    listOfCreatorFollowing,
    setListOfCreatorFollowing

 }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?._id || user?.result?.sub;

    const creatorsProfile = useSelector((state) => state.creatorProfile)
    const creatorId = creatorsProfile?.userId


    // const hasFollowed = creatorsProfile.follower.find((user) => user === userId) 
    
    const { totalPosts } = useSelector((state) => state.posts); 
    
    let windowSize = window.innerWidth;
    // const {creator} = useParams();


    const followingStatus = creatorsProfile?.follower?.findIndex((user) => user.userId == userId);
    const dispatch = useDispatch();
    const  effectRan = useRef(false);
    console.log('creatorprofile is ' + JSON.stringify(creatorsProfile.totalPosts))

    //follow or not follow the creator 
    const toggleFollow = () => {
   
       //add to following
        dispatch(followOrUnfollowCreator(creatorId))
       //add to follower/ make targetCreatorProfileAction
       dispatch(updateCreatorFollowStatus(creatorId))

    }

   
  
  return (
    <div className='flex justify-center md:w-full w-[85%] items-center '>
    <div className='my-5 mx-0 p-5  w-full rounded-3xl bg-bg-color overflow-x-clip border-slate-500 border border-b'>
        <div className="relative flex flex-col items-center justify-center w-full h-[200px]">
        {creatorsProfile?.profileBgImg ? <img className="h-full w-full object-cover object-center " src={ creatorsProfile?.profileBgImg } alt="" /> : <img className="w-[100px]" src={cameraIcon } alt="" /> } 
        {creatorsProfile?.profileIconImg ? <img className='w-[70px] h-[70px] rounded-full object-cover absolute left-1/2 top-full -translate-y-1/2 -translate-x-1/2' src={ creatorsProfile?.profileIconImg} alt="" /> : <img className="w-5" src={cameraIcon } alt="" /> }
        </div>
        {/* show follow button if it's not logged in user */}
      <div className='relative'>
      { (user && userId != creatorId ) && <div className='absolute right-4 top-5 '>
      <FollowBtn 
           toggleFollow = {toggleFollow}
           followingStatus = {followingStatus}
           />
      </div> 
      }

      {/* if userId is same as creatorId, show profile edit button */}
      {(user && userId == creatorId && windowSize < 1024) && 
        <EditProfileBtn/>
      }
            {/* <button className='button followBtn' 
                onClick={() => {
                    {
                      toggleFollow()
                      console.log('following')
                    }
                    }}
                >
                   {followingStatus != -1 ? 'unfollow' : 'follow'}
            </button> */}
        </div> 
       <div>
        <div className="my-8 mx-0 flex flex-col justify-center items-center">
            <h4>{creatorsProfile?.username}</h4>
            <p>{creatorsProfile ? creatorsProfile?.bio: ''}</p>
           
        </div>

   
        <div className="mt-0 mr-10 mb-2.5 ml-0 flex justify-end gap-8 text-center">
            <div className="text-base">
            {creatorsProfile?.follower?.length ? <Link to={`/posts/${creatorId}/follower`} style={{ textDecoration: 'none' }}
               onClick={
                ()=>{
                     setListOfFollowers(false);
                     setListOfFollowing(false);
                     setListOfCreatorFollowers(true);
                     setListOfCreatorFollowing(false);

                     console.log('creatorprofile  listOfCreatorFollowers is ' + listOfCreatorFollowers)
                     console.log('listOfCreatorFollowers ' + listOfCreatorFollowers)
                }
                
              }
          
              >
                <h4>{creatorsProfile?.follower?.length}</h4>
              </Link> : <h4>0</h4>
              }
        
                <p>{creatorsProfile?.follower?.length >= 2 ? 'followers' : 'follower' }</p>
            </div>
            {/* <div className="vl"></div> */}
            <div className="ga-8">
            {creatorsProfile?.following?.length ? <Link to={`/posts/${creatorId}/following`} style={{ textDecoration: 'none' }}
               onClick={
                ()=>{
                     setListOfFollowers(false);
                     setListOfFollowing(false);
                     setListOfCreatorFollowers(false);
                     setListOfCreatorFollowing(true);

                }
                
              }
          
              >
                <h4>{creatorsProfile?.following?.length}</h4>
              </Link> : <h4>0</h4>
              }
            
                <p>following</p>
            </div>
            {/* <div className="vl"></div> */}
            <div className="ga-8">
              {totalPosts !=0 ?  <Link to={`/posts/${creatorId}`} style={{ textDecoration: 'none' }}
               onClick={() => dispatch(getUserPosts({creator: creatorId, page:0}))}
              >
                <h4>{totalPosts}</h4>

              </Link> : <h4>0</h4>}
               
                <p>{totalPosts >=2 ? 'posts' : 'post'}</p>
            </div>
        </div>
        </div> 
    </div>
    </div> 
  )
}

export default CreatorsProfileCard