import React from 'react'
import { FaPhone } from 'react-icons/fa'
import { Navigate, useNavigate } from 'react-router-dom'

const EditProfileBtn = ({
    setOpenProfileModal
}) => {

  let windowSize = window.innerWidth;
   
  const navigate = useNavigate()
  return (
    <div className='relative'>
    <button className='rounded-2xl bg-border-color
     text-bg-color px-[2.5%] py-[2%] mt-[2%]
     border-none outline-none w-fit text-xs xl:text-sm
     duration-200
     cursor-pointer 
     hover:text-white
     hover:outline-1  hover:outline-solid hover:outline-slate-200
     hover:bg-bg-color
     absolute  right-2.5  top-1
     text-center' 
    onClick={() => {
        // if it is phone, navigate to editprofile mobile
         if(windowSize < 1024) {
           navigate('/editProfile')
         }
        //if it is PC, open modal of editprofile
       setOpenProfileModal(true); 
      
      }}
       >
      edit
      </button>
  </div>
  )
}

export default EditProfileBtn