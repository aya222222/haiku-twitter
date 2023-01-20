import React, {useEffect, useState} from 'react'
import {ImHome2}  from 'react-icons/im'
import {ImProfile}  from 'react-icons/im'
import {ImPencil, ImExit, ImEnter}  from 'react-icons/im'
import decode from 'jwt-decode';
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getPosts, getUserPosts } from '../../features/posts/postsSlice'
import { logoutProfile } from '../../features/profile/profileSlice'
import { logOut } from '../../features/auth/authSlice';
// import { getCreatorProfile } from '../../actions/creatorProfileAction'
import { getCreatorProfile } from '../../features/creatorProfile/creatorProfileSlice';

const Menu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const userId = user?.result?._id || user?.result?.sub;

  const backToHome = () => {
    dispatch(getPosts(0));
    navigate('/')
  } 
  
  const fetchUserPosts =  () => {
    dispatch(getUserPosts({creator:userId, page:0}))
    dispatch(getCreatorProfile(userId))
     navigate(`/posts/${userId}`)
 }



const location = useLocation();

const login = () => {
  navigate('/auth');

}

const logout = () => {
  dispatch(logOut());
  navigate('/');
  setUser(null);
  dispatch(logoutProfile())
  console.log('logout')
 
}

useEffect(() => {
  const token = user?.token;

  if(token){
    const decodedToken = decode(token);

    if(decodedToken.exp * 1000 < new Date().getTime()) logout();

  }
  //JWT....

  setUser(JSON.parse(localStorage.getItem('profile')));
}, [location]);

  return (
    <div class="bg-bg-color border-t border-slate-500 flex z-10
    md:flex-col justify-around fixed w-full md:bottom md:justify-start
    md:relative md:border-none
    bottom-0 gap-4 md:mt-4 md:ml-4 py-4">
      
      <div onClick={backToHome}  
        className='flex md:justify-start justify-center items-center gap-2'>

        <div className="w-8">
          <ImHome2 className="md:text-3xl text-2xl mr-1.5"/>
        </div>
        
        <div className='md:block hidden'>HOME</div>
      </div>

      {user && <>
       <div onClick={fetchUserPosts}
        className='flex md:justify-start justify-center  items-center gap-2'>

          <div className="w-8">
            <ImProfile className="md:text-3xl text-2xl mr-1.5" />
          </div>

          <div className='md:block hidden'>PROFILE</div>
      </div>

      <div 
        onClick={() => navigate('/create')}
        className='flex md:justify-start justify-center  items-center gap-2'>

          <div className="w-8">
            <ImPencil className="md:text-3xl text-2xl mr-1.5" />
          </div>

          <div className='md:block hidden'>CREATE HAIKU</div>
      </div>
        </>
      }
        {/* if user is login, show logout icon.  */}
        {user ? <div 
            onClick={logout}
            className='flex md:hidden justify-center  items-center gap-2'>

          <div
            className="w-8">
            <ImExit className="md:text-3xl text-2xl mr-1.5" />
          </div>


        </div> 
         : 
        <div
            onClick={login}
            className='flex md:hidden justify-center  items-center gap-2'
        >
         <div
            className="w-8">
            <ImEnter className="md:text-3xl text-2xl mr-1.5" />
          </div>

        </div>
        }

    </div>
  )
}

export default Menu