import React from 'react'
import './PostBtnCard.css'
import { useSelector } from 'react-redux'


const PostBtnCard = ({setOpenHaikuModal, openHaikuModal}) => {
 const user = JSON.parse(localStorage.getItem('profile'));
 const userId = user?.result?._id || user?.result?.sub;
 const existingProfile = useSelector((state) => state.profile) 
 const loggedInUser = existingProfile?.userId == userId




const handleHaikuModal = () => {
  console.log('user is ' + existingProfile)
  if(!loggedInUser){
    console.log('user is ' + existingProfile)
    console.log(loggedInUser)
    alert('Please create profile before post haiku')
    setOpenHaikuModal(false)
  }else{
    setOpenHaikuModal(true)
  }
} 


  return (
    <div className='hidden lg:flex justify-center'>
      <button className='rounded-3xl bg-border-color
           text-bg-color px-4 py-2 
           border-none outline-none  text-xl
           transition-all ease-out duration-200
           cursor-pointer 
           hover:text-white
           hover:outline-2  hover:outline-solid hover:outline-slate-200
           hover:bg-bg-color
           ' 
        onClick={() => handleHaikuModal()}>
        create Haiku
      </button>
    </div>
  )
}

export default PostBtnCard