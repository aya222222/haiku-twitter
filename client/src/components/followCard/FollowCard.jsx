import React from 'react'
import FollowBtn from '../followBtn/FollowBtn'
import './FollowCard.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { followOrUnfollowCreator } from '../../features/profile/profileSlice'
// import { getCreatorProfile } from '../../actions/creatorProfileAction'
import { getCreatorProfile } from '../../features/creatorProfile/creatorProfileSlice'
import { updateTargetCreatorFollowStatus } from '../../features/targetCreatorProfile/targetCreatorProfileSlice'
import cameraIcon from '../../img/camera-icon.png'
import { getUserPosts } from '../../features/posts/postsSlice'

const FollowCard = ({follow, followingList}) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?._id || user?.result?.sub;
  const followId = follow?.userId;

  
  
  const loggedInUser = useSelector((state) => state.profile)
  const FollowingListOfLoggedInUser = loggedInUser.following
  const followingStatus = FollowingListOfLoggedInUser?.findIndex((followingUser) => followingUser.userId == followId);

  
  const dispatch = useDispatch();

  
  const toggleFollow = () => { 
 
      //add to following . but think about creator and loggedin user is same
       dispatch(followOrUnfollowCreator(followId))
      //add to follower. but think about creator and loggedin user is same
      dispatch(updateTargetCreatorFollowStatus(followId))

       // if(!hasFollowed){
       //     //it's way faster to use state to toggle follow than fetch from mongoDB evreytime.
       //   setFollower([...follower, userId])
       // }
       // else{
       //    setFollower(follower.filter(id => id !== userId))
       // }
   }

   
  const fetchUserPosts =  () => {
    dispatch(getUserPosts({creator:followId, page:0}))
    dispatch(getCreatorProfile(followId))
    // console.log('posts creator is ' + post.creator);
    navigate(`/posts/${followId}`)
  }

  return (
    <div className="w-full lg:w-[85%] bg-bg-color border border-solid border-slate-500 rounded-3xl p-5 flex gap-4 justify-between items-center cursor-pointer" 
      onClick={fetchUserPosts}>
      <div className="flex justify-center gap-4">

      <div className=''>
      {follow?.profileIconImg ? <img className='inline-block h-[60px] w-[60px] rounded-full object-cover ' src={follow?.profileIconImg}/> : <img className="cameraIcon1" src={cameraIcon } alt="" /> }
      </div>
      <div className='flex flex-col justify-between'>
       <h5>{follow?.username}</h5>
       <p>{follow?.bio}</p>
     </div>
     </div>

     <div className='inline-block'>
   
    {user && userId != followId && <FollowBtn 
      followingStatus={followingStatus}
      toggleFollow={toggleFollow}
      />
    }
    </div>
    </div>
  )
}

export default FollowCard