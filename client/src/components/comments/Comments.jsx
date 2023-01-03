import React, { useState, useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { commentPost } from '../../features/posts/postsSlice'
import './Comments.css'
import Comment from '../comment/Comment';
import CommentFunctions from '../commentFunctions/CommentFunctions';

const Comments = ({ post }) => {

    const [comments, setComments] = useState(post?.comments);
    const [ comment, setComment ] = useState('');
    const [clickedDots, setClickedDots] = useState(null);
    const user = JSON.parse(localStorage.getItem('profile'));
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const commentsRef = useRef();

    
    const commentorIconImg = useSelector((state) => state.profile.profileIconImg)   
    const handleClick = async () => {
      console.log('posts is in comment '  + JSON.stringify(post))
       const finalComment = `${user.result.username || user.result.sub}: ${comment}`
      try {
         console.log('post Id ' +  finalComment)
         const newComments = await dispatch(commentPost(finalComment, commentorIconImg, post._id)).unwrap();
          console.log('new comment' + newComments)
         setComments(newComments);
         setComment('');
        
      } catch (error) {
        console.log(error)
      }
       
       setTimeout(()=>{
        commentsRef.current.scrollIntoView({ behavior: 'smooth', block: "end" })
       },100)
      
       
    }


 
    return (
    <div className='flex flex-col  gap-4 p-5'>
        <div className='flex flex-col gap-4'>
        {comments?.map((comment, index) => { return (
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