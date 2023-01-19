import React , { useState, useEffect, useRef }from 'react'
import '../home/Home.css'
import ProfileSide from '../../components/profileSide/ProfileSide'
import PostSide from '../../components/postSide/PostSide'
import HaikuModal from '../haikuModal/HaikuModal'
import EditProfile from '../editProfile/EditProfile'
import RightSide from '../../components/rightSide/RightSide'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { getPosts } from '../../actions/postAction' 
import { getProfile, createProfile } from '../../features/profile/profileSlice'
import FollowList from '../../components/followAndPostsCards/FollowList'

import { getCreatorProfile } from '../../actions/creatorProfileAction'
import LikeList from '../likeList/LikeList'
import Menu from '../../components/menu/Menu'
// import Pagination from '../../components/pagination/Pagination'
// import { useNavigate, useLocation } from 'react-router-dom';


// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }


const Home = ({openHaikuModal,
  setOpenHaikuModal,
  openProfileModal,
  setOpenProfileModal,
  openLikeModal,
  setOpenLikeModal,
  tags,
  setTags,
  currentId,
  setCurrentId,
  editFlag,
  setEditFlag,
  listOfFollowers,
  setListOfFollowers,
  listOfFollowing,
  setListOfFollowing,
  listOfCreatorFollowers,
  listOfCreatorFollowing,
  setListOfCreatorFollowers,
  setListOfCreatorFollowing,
}) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const userId = user?.result?._id || user?.result?.sub;
  const existingProfile = useSelector((state) => state.profile);
  const creatorProfile = useSelector((state) => state.creatorProfile);

  const profileId = existingProfile?._id;
  
console.log('profile id is ' + profileId)
console.log('user is ' +  useSelector((state) => JSON.stringify(state.profile)))


  const dispatch = useDispatch();
  const effectRan = useRef(false);




 
  
  useEffect(() => {
  
    // if(effectRan.current === false){
    if(existingProfile?.loggedIn){
      dispatch(getProfile())
      console.log('getprofile invoked')
      console.log('profile id is ' + profileId)
    }
     

      }
   
    // return () => {
    //   effectRan.current = true;
    // };
  //  }
   , [dispatch, userId]);

 
  return (
    <>
   <div >
    <div className="Home">
    <ProfileSide className=""
      openHaikuModal={openHaikuModal} 
      setOpenHaikuModal={setOpenHaikuModal}
      openProfileModal={openProfileModal}
      setOpenProfileModal={setOpenProfileModal}
      openLikeModal={openLikeModal}
      setOpenLikeModal={setOpenLikeModal}

      tags={tags}
      setTags={setTags}
      listOfFollowers={listOfFollowers}
      setListOfFollowers={setListOfFollowers}
      listOfFollowing={listOfFollowing}
      setListOfFollowing={setListOfFollowing}
      listOfCreatorFollowers={listOfCreatorFollowers} 
      setListOfCreatorFollowers={setListOfCreatorFollowers}
      listOfCreatorFollowing={listOfCreatorFollowing} 
      setListOfCreatorFollowing={setListOfCreatorFollowing}

     />
     <Outlet />
{/* <FollowList  
      followersList={followersList}
      followingList = {followingList}
     /> */}

   {/* {pathName == '/posts' && (<PostSide 
         currentId={currentId}
         setCurrentId={setCurrentId}
         openHaikuModal={openHaikuModal} 
         setOpenHaikuModal={setOpenHaikuModal}
         tags={tags}
         editFlag={editFlag} setEditFlag={setEditFlag}
        /> ) } */}

    {/* {pathName == (`/${userId}/follower` || `/${userId}/following`) && 
    (<FollowList  
      followersList={followersList}
      followingList = {followingList}
     />)    
  }  */}
    
    <RightSide />
   
     </div>
    
   
   </div>
   {openHaikuModal && <HaikuModal
    openHaikuModal={openHaikuModal} 
    setOpenHaikuModal={setOpenHaikuModal} 
    currentId={currentId}
    setCurrentId={setCurrentId}
    editFlag={editFlag} setEditFlag={setEditFlag}

   />
 
   
  
}
  

{openProfileModal && <EditProfile 
        openProfileModal={openProfileModal} 
        setOpenProfileModal={setOpenProfileModal}
        // openDeleteAlertModal={openDeleteAlertModal}
        // setOpenDeleteAlertModal={setOpenDeleteAlertModal}
        // clickOutSide={clickOutSide}
        // checkTextExists={checkTextExists}
        // text={text}
        // setText={setText}
        // userName={userName} 
        // setUserName={setUserName}
        // clickCloseModal={clickCloseModal}
        // bio={bio}
        // setBio={setBio}

       />
}
<div className='md:hidden'>
 <Menu />
</div>
   </>
  )
}

export default Home