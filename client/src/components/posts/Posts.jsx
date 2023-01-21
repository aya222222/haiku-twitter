import React, { useState, useEffect } from 'react'

import './Posts.css'
import Post from '../post/Post'

import LikeList from '../../pages/likeList/LikeList'
import { useSelector, useDispatch } from 'react-redux'

import { useParams } from 'react-router-dom';
// import { getPosts } from '../../actions/postAction'

const Posts = ({
  posts,
  currentId, 
  setCurrentId, 
  openHaikuModal, 
  setOpenHaikuModal,
  openLikeModal,
  setOpenLikeModal,
  editFlag, 
  currentPage, 
  postsPerPage,
  setPostsPerPage,   setEditFlag

}) => {
  const [likeList, setLikeList] = useState([])
  // const {posts} = useSelector((state) => state.postsReducer);
  console.log('posts in posts page is '+ JSON.stringify(posts))
  let creatorsPosts;
  const {creator} = useParams();
  const dispatch = useDispatch();
  console.log('openlikeModal is ' + openLikeModal)
//   if(creator){
//     creatorsPosts = posts.filter(post => post.creator == creator)
//  }

//  let displayedPosts = creator ? creatorsPosts : posts
//   const lastPostIndex = currentPage * postsPerPage;
//   const firstPostIndex = lastPostIndex - postsPerPage;


//  let currentPosts = posts.slice(firstPostIndex, lastPostIndex);
 
// useEffect(() => {
//   dispatch(getPosts())
// }, [])

 return (
  <>
  
     <div className='flex flex-col justify-center items-center gap-4 
       my-5 mx-0 p-5 rounded-2xl md:w-full w-[85%]'> 
     
      {posts.map((post) => {
     
         return <Post  
          key={post._id} 
          post={post} 
          currentId={currentId} 
          setCurrentId={setCurrentId} 
          openHaikuModal={openHaikuModal} 
          setOpenHaikuModal={setOpenHaikuModal}
          openLikeModal={openLikeModal}
          setOpenLikeModal={setOpenLikeModal}
          editFlag={editFlag} setEditFlag={setEditFlag}
          setLikeList={setLikeList}
          />
      })}
     
  </div>

  
{ openLikeModal && <LikeList 
    likeList={likeList}
    openLikeModal={openLikeModal}
    setOpenLikeModal={setOpenLikeModal}
    />}

    </>
    ) 
   
  
}

export default Posts