import React, { useEffect, useState } from 'react'
import { Link, useLinkClickHandler, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getPosts,  } from '../../features/posts/postsSlice';
import "./pagination.css"

const Pagination = ({postsPerPage, setCurrentPage, page}) => {
    
   const dispatch = useDispatch();
    const  {posts, totalPages} = useSelector((state) => state.posts);
  
    const {creator} = useParams();
     const [isHover, setIsHover] = useState(false)
    
    console.log('post.length is ' + JSON.stringify(posts))
   
  //  if hover to the page button that is clicked, change background color 
   const style = {
    backgroundColor: isHover ? '#64748b' : '#e5e7eb',
    color: isHover ? '#e5e7eb': '#1c1c35',
    // border: isHover ? '#e5e7eb 1px solid' : 'none',
   

   }
  
   const handleMouseEnter = () => {
    setIsHover(true)
   };

   const handleMouseLeave = () => {
    setIsHover(false);
 };
    let pages = [];
    
 
    for(let i = 1; i <= totalPages; i++){
      pages.push(i);
    }

    // for(let i = 1; i <= Math.ceil(posts?.length / postsPerPage); i++) {
    // pages.push(i);
    // }

    // useEffect(() => {
    //   //page is from query.
    //   if(page) dispatch(getPosts(page));
    // }, [page])
    
  return (

    <div className="flex justify-center items-center bg-bg-color pt-2.5 pr-[15px]">
      { 
       pages.map((pageNum, index) => {
        
        return (
         <Link className="
         rounded-full bg-bg-color
        text-border-color px-2.5 py-1 
        border-solid border-slate-200 border outline-none  text-xl
        transition-all ease-out duration-200
        cursor-pointer 
        hover:text-bg-color
        hover:border-none  
        hover:bg-slate-500 
         flex justify-center items-center no-underline w-10 h-10 font-semibold  my-0 mx-2.5  active:font-black " style={(index==page) ? style : null} 
         onMouseEnter={index==page && handleMouseEnter}
         onMouseLeave={index==page && handleMouseLeave}
         key={index}  to={creator ? `/posts/${creator}?page=${pageNum-1}`: `/posts?page=${pageNum-1}`} 
           onClick={()=>dispatch(getPosts(pageNum-1))}
         >
          {pageNum}
          </Link>
       )
    
        } )
        
        }
      
        </div>
  )
}

export default Pagination