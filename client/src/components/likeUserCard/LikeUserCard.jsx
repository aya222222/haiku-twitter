import React from 'react'
import cameraIcon from '../../img/camera-icon.png'
import './LikeUserCard.css'
import FollowBtn from '../followBtn/FollowBtn';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { followOrUnfollowCreator } from '../../features/profile/profileSlice';
import { updateTargetCreatorFollowStatus } from '../../features/targetCreatorProfile/targetCreatorProfileSlice';
import { getUserPosts } from '../../features/posts/postsSlice';
import { getCreatorProfile } from '../../features/creatorProfile/creatorProfileSlice';
import FollowCard from '../followCard/FollowCard';

const LikeUserCard = ({likeUser, setOpenLikeModal}) => {


    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?._id || user?.result?.sub;
    const likeUserId = likeUser.userId;
    const loggedInUser = useSelector((state) => state.profile)
    const FollowingListOfLoggedInUser = loggedInUser.following
    const followingStatus = FollowingListOfLoggedInUser?.findIndex((followingUser) => followingUser.userId == likeUserId);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleFollow = () => { 
 
        //add to following . but think about creator and loggedin user is same
         dispatch(followOrUnfollowCreator(likeUserId))
        //add to follower. but think about creator and loggedin user is same
        dispatch(updateTargetCreatorFollowStatus(likeUserId))
  
     }

     
    const fetchUserPosts =  () => {
      dispatch(getUserPosts({creator:likeUserId, page:0}))
      dispatch(getCreatorProfile(likeUserId))
      // console.log('posts creator is ' + post.creator);
      navigate(`/posts/${likeUserId}`)
      setOpenLikeModal(false);
    }
  

  return (
    <div className="relative w-full flex justify-center" 
         onClick={fetchUserPosts}
     >
      <FollowCard 
            key={likeUser._id}
            follow={likeUser}
             />
     {/* <div className="flex justify-center gap-4">
        <div className='iconImgSection'>
            {likeUser?.profileIconImg ? <img src={likeUser?.profileIconImg}/> : <img className="cameraIcon1" src={cameraIcon } alt="" /> }
        </div>
        <div className='userDetailSection'>
            <h5>{likeUser?.username}</h5>
            <p>{likeUser?.bio}</p>
        </div>
    </div>
  
    <div className="likeUserFollowBtnSection">
    {userId != likeUserId && <FollowBtn 
        followingStatus={followingStatus}
        toggleFollow={toggleFollow}
        />
    }
    </div> */}
 
  </div>
  )
}

export default LikeUserCard