import React, { useState, useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { commentPost } from '../../features/posts/postsSlice'
import './Comments.css'
import Comment from '../comment/Comment';
import CommentFunctions from '../commentFunctions/CommentFunctions';
import { useEffect } from 'react';

const Comments = ({ post }) => {

 
    const [ comment, setComment ] = useState('');
    const [clickedDots, setClickedDots] = useState(null);
    const user = JSON.parse(localStorage.getItem('profile'));
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const commentsRef = useRef();
    
    const commentorIconImg = useSelector((state) => state.profile.profileIconImg)   
    
   
    const handleClick =  () => {
      
       const value = `${user.result.username || user.result.sub}: ${comment}`
      try {
         console.log('post Id ' +  post._id)
         dispatch(commentPost({value, commentorIconImg, id:post._id}));
    
        
         setComment('');
        
      } catch (error) {
        console.log(error)
      }
       
       setTimeout(()=>{
        commentsRef.current.scrollIntoView({ behavior: 'smooth', block: "end" })
       },100)
      
       
       console.log('post is ' + JSON.stringify(post))
    }
     

 
    return (
    <div className='flex flex-col  gap-4 p-5'>
        <div className='flex flex-col gap-4'>
        {post?.comments?.map((comment, index) => { return (
          <Comment 
            comment={comment}
            index={index}
            postId={post._id}
            commentId={comment._id}
            clickedDots={clickedDots}
            setClickedDots={setClickedDots}
            />
          
        )
}
        )}
         <p ref={commentsRef} />
        </div>
        { user && (
          
         <div className=''>
           <textarea 
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            className="w-full p-2.5 outline-none border-none rounded-3xl bg-card-color" placeholder='Write a comment' name="write-comment" id="" cols="30" rows="10">
           </textarea>
     
            <div className="flex gap-4 justify-end mt-4">
              <button className='rounded-3xl bg-border-color w-[20%]
                text-bg-color px-2.5 py-1 
                border-none outline-none  
                transition-all ease-out duration-200
                cursor-pointer 
                hover:text-white
                hover:outline-2  hover:outline-solid hover:outline-slate-200
                hover:bg-bg-color
      ' 
                disabled={!comment || !comment.match(/\S/g)}
                onClick={handleClick}
              >
                  POST
              </button>    
              <button className='rounded-3xl w-[20%]
                text-border-color px-2.5 py-1 
                border-none outline-none  
                transition-all ease-out duration-200
                cursor-pointer 
                hover:text-white
                hover:outline-2  hover:outline-solid hover:outline-slate-200
                hover:bg-bg-color' 
              
                onClick={()=> {
                    setComment('');
        
                }} >
                CLEAR
              </button>    
            </div> 
        </div>
        )}
    </div>
  )
}

export default Comments