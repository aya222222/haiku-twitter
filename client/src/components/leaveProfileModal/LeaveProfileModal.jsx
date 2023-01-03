import React, {useState} from 'react'

const LeaveProfileModal = ({setOpenDeleteAlertModal, setUserName, setOpenProfileModal, clickCloseModal, setBio}) => {

const [clear, setClear] = useState(false);

  return (
    <div className='Modal'>
      <div className="deleteAlertModalInner">
      <span className="fa-solid fa-xmark"  onClick={(e) => {setOpenDeleteAlertModal(false)} }></span>
      <div className="deleteAlertModalSection">
      <h4>Do you really want to leave this page?</h4>
      <div className="alertBtnSection">
        <button className='button deleteBtn' 
        onClick={
          (e)=>{
            clickCloseModal(e,setUserName, setOpenProfileModal);
            setBio('')
          }}>YES</button>
        <button className='button postBtn'  onClick={(e) => {setOpenDeleteAlertModal(false)} }>NO</button>
      </div>
      </div>
      </div>
    </div>
  )
}

export default LeaveProfileModal