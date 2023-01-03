import React, { useState } from 'react'
import AuthBtnCard from '../authBtnCard/AuthBtnCard'
import './RightSide.css'

import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import CreatorsProfileCard from '../creatorsProfileCard/CreatorsProfileCard';
const RightSide = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  return (
 
    <div className='w-[20%] flex flex-col gap-4'>
     
        <AuthBtnCard />

    </div>
  
  )
}

export default RightSide