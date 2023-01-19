import React, { useState } from 'react'
import './Post.css'
import { FiHeart , FiMessageCircle, FiEdit, FiTrash2 } from "react-icons/fi";
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { deletePost, likePost, getUserPosts, getPost } from '../../features/posts/postsSlice'
import { getCreatorProfile } from '../../features/creatorProfile/creatorProfileSlice';
import Comments from '../comments/Comments';
import { useEffect } from 'react';



const Post = ({ 
  post, 
  currentId, 
  setCurrentId, 
  openHaikuModal,
  setOpenHaikuModal,
  openLikeModal,
  setOpenLikeModal,
  setLikeList,
  editFlag, 
  setEditFlag 
}) => {
 const [openDeleteModal, setOpenDeleteModal] = useState(false); 

 const user = JSON.parse(localStorage.getItem('profile'));
 const [likes, setLikes] = useState(post?.likes);
 console.log('likes are ' + JSON.stringify(likes))
 const userId = user?.result?._id || user?.result?.sub
 let hasLikedPost = likes?.find((user) => user?.userId === userId) 
 console.log("hasliked " + likes)
 
 
 function useQuery() {
   return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const page = query.get('page') || 0;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {postId} = useParams();
  console.log('postId is ' + postId)
  //  const query = useQuery();
  //  const page = query.get('page') || 0;
  const loggedInUser = useSelector((state) => state.profile)
  // const creatorIconImg = useSelector((state) => state.creatorProfileReducer.profileIconImg)
  
  

 const toggleLike = async () => {
   
   if(user){
     
     dispatch(likePost(post._id)); 
     
     //it's way faster to use state to toggle like than fetch from mongoDB evreytime.
    if(hasLikedPost){
      setLikes(likes.filter((user) => user.userId !== userId))
   
      
    }else if(!hasLikedPost){
      //if the post is not liked by loggged in user(custom auth or google auth), setLike(true)
      setLikes([...likes, {
        userId: userId,
        username:loggedInUser.username,
        profileIconImg: loggedInUser.profileIconImg,
        bio: loggedInUser.bio,
      }])
      
    }
  }

 
 }

 const showLikeList = () => {
       setOpenLikeModal(true)
       setLikeList(post.likes)
       
 }
 
 const fetchUserPosts =  () => {
    dispatch(getUserPosts({creator: post.creator, page:0}))
    dispatch(getCreatorProfile(post.creator))
     console.log('posts creator is ' + post.creator);
     navigate(`/posts/${post.creator}`)
 }

 const fetchPost = () => {
  console.log('post._id is '+ post?._id)
  //navigate to the specific post and open comments
  dispatch(getPost(post?._id));

  navigate(`/posts/post/${post?._id}`)
 }
//  const openPost = () => navigate(`/posts/${post._id}`);

var windowSize = window.innerWidth;

const createOrUpdateHaiku = () => {
  
  setCurrentId(post._id); 

  if (windowSize < 1024) { 
    navigate('/create')
  } else {
    setOpenHaikuModal(true)
  }
}

  return (
    <>
    <div className='w-full rounded-3xl p-5 flex flex-col gap-4 border-slate-500 border-solid border'>
        <div className='flex items-center w-fit
         gap-4 cursor-pointer 
        '  onClick={fetchUserPosts}>
          <div>
            <img className='inline-block h-16 w-16 
              rounded-full  object-cover
            ' src={post.profileIconImg} alt="" />
          </div>
          
          <div className="w-fit cursor-pointer" >
              {post.username}
          </div>
        </div>
    
   
      
        <div className="py-6 px-2.5 rounded-md flex
          flex-col gap-4 justify-center items-center
        ">
           <p>{post?.text}</p> 
           {post?.selectedFile ? <img 
            className='h-52 object-cover w-full'
           src={post?.selectedFile}></img> : null}
        </div>
   
        <div className="ml-auto"> 
         {!post?.editedAt ?  <p>{moment(post?.createdAt).fromNow()}</p> : (<><p className="editedTime">{moment(post.editedAt).fromNow()}</p> <span className='edited'>edited</span> </>)}
        </div>
        <div class="flex-grow border-t border-slate-500"></div>
        <div className='flex justify-between'>
 
          <div className='flex justify-between w-[40%]'>
            <div className="flex flex-col items-center">

            <FiHeart className={`${user && `cursor-pointer w-7 h-7 opacity-40`} 
            ${likes?.findIndex((user) => user?.userId == userId) != -1  ? 'fill-rose-700 text-rose-700 opacity-100' : ''} 
            ${likes?.findIndex((user) => user?.userId == userId) == -1  && likes?.length ? 'fill-pink-100 text-pink-100 opacity-100' : ''}`}  
              // disabled={!user}
            onClick={()=>{
              
              toggleLike();
              }}/> 
            {likes?.length >= 2 ? (<div className="text-xs flex flex-col items-center" onClick={showLikeList}><p>{likes?.length} </p> </div>)
              : likes?.length == 1 ? (<div className="text-xs flex flex-col items-center"  onClick={showLikeList}><p>{likes?.length} </p> </div>) : null}
            </div>
            <div className="flex flex-col items-center">
            <FiMessageCircle className={ user && `cursor-pointer w-7 h-7 opacity-40`}
              // disabled={!user}
            onClick={fetchPost}/> 
            {post?.comments?.length >= 2 ? (<div className="text-xs flex flex-col items-center"><p>{post?.comments?.length} </p> </div>)
              : post?.comments?.length == 1 ? (<div className="text-xs flex flex-col items-center"><p>{post?.comments?.length} </p> </div>) : null}
            </div>
            {/* <div className="reactionComments">
            <img src={comment} alt="" />
          
              {post.comment >= 2 ? (<><p>{post.comment} </p> <p>comments</p></>)
              : post.comment == 1 ? (<><p>{post.comment} </p> <p>comment</p></>) : null}
            </div> */}
          </div>

          {(userId === post?.creator) &&
          <div className='flex justify-between w-[35%]'>
            <div className="text-center"
            onClick={createOrUpdateHaiku}>
              <FiEdit className='cursor-pointer w-7 h-7 opacity-40'/>
            </div>

            <div className="text-center"
             onClick={()=> {
              setOpenDeleteModal(true)
            }} 
            >
              <FiTrash2 className='cursor-pointer w-7 h-7 opacity-40'/>
            </div>
          </div>
         }
        </div>
       
       <div className="">{ post?.tags?.map((tag) => tag ? `#${tag} ` : null) }</div>

      {/* if loggedin user is same as post creator, display buttons   */}
    
    {/* {(userId === post?.creator) && (
   <div className="haikuBtn">
   <button className='editBtn button' 
   onClick={()=>{
    setCurrentId(post._id); 
    setOpenHaikuModal(true)
    
    } }>
    EDIT
   </button>    
   <button className='deleteBtn button' 
    // disabled={ !setInputFlag ? true : false}
    onClick={()=> {
       setOpenDeleteModal(true)
    }} >
    DELETE
   </button>    
  </div>  
        ) } */}
      
     { postId && <Comments post={post} key={post?._id}/>} 
    </div>

    {openDeleteModal  && (
       <div className='bg-slate-600 bg-opacity-50  fixed z-[1] left-0 top-0 h-screen w-full'>
       <div className=" bg-bg-color  px-[15px] py-[25px] w-1/4 left-1/2 top-1/2 relative -translate-y-1/2 -translate-x-1/2 rounded-md" >
       <span className="fa-solid fa-xmark"  onClick={(e) => setOpenDeleteModal(false) }></span>
       <div className="flex flex-col items-center opacity-100 gap-4">
       <h4>Do you really want to delete the post? </h4>
     <div className="flex gap-2.5">
     <button className='rounded-3xl bg-border-color
                      text-bg-color px-4 py-2 
                      border-none outline-none  text-xl
                      transition-all ease-out duration-200
                      cursor-pointer 
                      hover:text-white
                      hover:outline-2  hover:outline-solid hover:outline-slate-200
                      hover:bg-bg-color w-24 ' 
        onClick={()=> {

          dispatch(deletePost(post?._id));

          setOpenDeleteModal(false);

        

          // dispatch(getPosts(page));
        }}
       >YES</button>
     <button className='rounded-3xl bg-border-color
                    text-bg-color px-4 py-2 
                    border-none outline-none  text-xl
                    transition-all ease-out duration-200
                    cursor-pointer 
                    hover:text-white
                    hover:outline-2  hover:outline-solid hover:outline-slate-200
                    hover:bg-bg-color w-24' 
            onClick={(e) => setOpenDeleteModal(false)}>NO</button>
   </div>
 
       </div>
       </div>
     </div>
    )}
   

    </>
  )
}

export default Post