import React, { useEffect } from 'react'
import './CommentFunctions.css'
import {FiTrash2, FiEdit2} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteComment, getPost} from '../../features/posts/postsSlice';
import { Navigate } from 'react-router-dom';
const CommentFunctions = ({ showFuncs, postId, commentId }) => {

 const dispatch = useDispatch();

//  useEffect(() => {
//    dispatch(getPost(postId))
//  }, [dispatch])
  return (
    <ul 
      style={{display:  showFuncs ? 'block' :  'none' } }
       className="absolute bg-bg-color border-slate-500 rounded z-10" >
   
      <div class="flex justify-start gap-3 items-center"
           onClick={() => {
            dispatch(deleteComment({postId, commentId}))
            console.log('comment id ' + JSON.stringify({postId, commentId}))
        }}
      >
        <FiTrash2 /> 
        <li>
            Delete
        </li>
      </div>
      <div class="flex justify-start gap-3 items-center"
          onClick={() => {
            // editComment(postId, {commentId})
      }}
      >
        <FiEdit2 />
      <li>
        Edit
      </li>
      </div>  
    </ul>
  )
}

export default CommentFunctions