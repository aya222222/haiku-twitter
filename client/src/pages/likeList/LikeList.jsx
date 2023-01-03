import React from 'react'
import './LikeList'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import './LikeList.css'
import LikeUserCard from '../../components/likeUserCard/LikeUserCard'

const LikeList = ({likeList, setOpenLikeModal, openLikeModal}) => {



  const clickOutSide = (e) => {
        if(e.target == e.currentTarget) {
      　　setOpenLikeModal(false);
        }
        }

  return (
    <>
  
    < div className='bg-slate-600 bg-opacity-50  fixed z-[1] left-0 top-0 h-screen w-full' onClick={(e) => { clickOutSide(e) } }>
      <div className="bg-bg-color px-0 py-10  w-[28%] top-[50%] left-[50%] relative -translate-y-1/2 -translate-x-1/2  rounded-3xl ">
        <span className="fa-solid fa-xmark"  
         onClick={() => {
          
          setOpenLikeModal(false);
          
          }
           }></span>
        <div className="flex flex-col justify-center items-center gap-4">
            {likeList.map(likeUser => {
              return <LikeUserCard 
                        likeUser={likeUser}
                        setOpenLikeModal={setOpenLikeModal}
              />
             })
            }
   
       
          
      
    
        
        </div>
      </div>
    </div>
    </>
    
  )
}

export default LikeList