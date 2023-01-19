import React, {useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getUserPosts } from '../../features/posts/postsSlice';
// import { getCreatorProfile } from '../../actions/creatorProfileAction';
import { getCreatorProfile } from '../../features/creatorProfile/creatorProfileSlice';
import CommentFunctions from '../commentFunctions/CommentFunctions';
import moment from 'moment';
import {FiMoreHorizontal} from 'react-icons/fi'
import { useEffect } from 'react';


const Comment = ({comment, index,  postId, commentId, clickedDots, setClickedDots}) => {
    const ref = useRef();
    console.log('comment is ' + JSON.stringify(comment))
    console.log('text is ' + JSON.stringify(comment))
  
    const [showFuncs, setShowFuncs] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

      // Call hook outside click
    useOnClickOutside();

    const fetchUserPosts =  () => {
        dispatch(getUserPosts({creator:comment?.userId, page:0}))
        dispatch(getCreatorProfile(comment?.userId))
        // console.log('posts creator is ' + post.creator);
        navigate(`/posts/${comment?.userId}`)
   
      }

    const toggleClick = (e) => {
        setClickedDots(index);
     
        //if click dots again, it toggle showFunc
        setShowFuncs(prev => !prev);
        
        
      }  
      
    
      function useOnClickOutside() {
        useEffect(
          () => {
            const listener = (event) => {
              
              // // Do nothing if clicking ref's element or descendent elements
              if (ref.current.contains(event.target)) {
              
                return;
              }
              
             
              setShowFuncs(false);

           
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);

            return () => {
              document.removeEventListener("mousedown", listener);
              document.removeEventListener("touchstart", listener);
            };
          }, [] );
      }

     
  return (
    <>
    {/* <div className='IconImgAndComment'> */}
    <div className="flex justify-between" >
    <div className="flex items-center max-h-24 overflow-y-auto gap-4 mb-2.5">

       <div>
       <img onClick={() => fetchUserPosts()} 
        className="inline-block h-10 w-10 rounded-full object-cover cursor-pointer" 
        src={comment?.commentorIconImg}></img>
       </div>
       <div className="flex flex-col">
           <p>
               <strong onClick={() => fetchUserPosts()} 
                 className="cursor-pointer">
                   {comment?.value?.split(': ')[0]} 
               </strong> 
               <small class="text-xs"> &emsp;{moment(comment?.createdAt).fromNow()  }</small>
           </p>
           <p>{comment?.value?.split(':')[1]}</p>
        
      
       </div>

       {/* <span className='commentedTime'>{moment(comment.createdAt).fromNow()}</span> */}
    </div>   
    <div  ref={ref}  className='cursor-pointer relative' 
          onClick={(e) => toggleClick(e)}>
           <FiMoreHorizontal />
           <CommentFunctions 
              showFuncs={showFuncs}
              postId={postId}
              commentId={commentId}
           />
    </div>
    
    </div>
  
      
 
    {/* </div> */}
  </>
  )
}

export default Comment