import React, {useState} from 'react'

const DeleteAlertModal = ({setOpenDeleteAlertModal, setInfo, setUserName,setOpenModal,setOpenProfileModal, clickCloseModal,
                           setBio
}) => {



  return (
    <div className='fixed z-10 left-0 top-0 h-screen w-full overflow-auto bg-slate-600 bg-opacity-50'>
      <div className="deleteAlertModalInner">
      <span className="fa-solid fa-xmark"  onClick={(e) => setOpenDeleteAlertModal(false) }></span>
      <div className="deleteAlertModalSection">
      <h4>Do you really want to leave this page? </h4>
    <div className="alertBtnSection">
    <button className='button deleteBtn' 
    onClick={
      (e)=>{ clickCloseModal(e, setInfo, setOpenModal, setBio)
      }}>YES</button>
    <button className='button postBtn' onClick={(e) => setOpenDeleteAlertModal(false)}>NO</button>
  </div>

      </div>
      </div>
    </div>
  )
}

export default DeleteAlertModal