import React from 'react'
import './FollowBtn.css'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { followOrUnfollowCreator } from '../../actions/profileAction';
import { updateTargetCreatorFollowStatus } from '../../actions/creatorProfileAction';

const FollowBtn = ({followingStatus, toggleFollow}) => {


  return (
    <button className='rounded-3xl bg-border-color
      text-bg-color px-2.5 py-1 
      border-none outline-none  text-xl
      transition-all ease-out duration-200
      cursor-pointer 
      hover:text-white
      hover:outline-2  hover:outline-solid hover:outline-slate-200
      hover:bg-bg-color' 
    onClick={(e) => {
        {     
        e.stopPropagation();
          toggleFollow()
          console.log('following')
        }
        }}
    >
       {followingStatus != -1 ? 'unfollow' : 'follow'}
</button>
  )
}

export default FollowBtn