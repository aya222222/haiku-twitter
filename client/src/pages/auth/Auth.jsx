import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { RiEyeCloseLine } from 'react-icons/ri';
import { RiEyeFill } from 'react-icons/ri';
import './Auth.css'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { signup, login, googleAuth } from '../../features/auth/authSlice';
import { logInProfile } from '../../features/profile/profileSlice';
import { useSelector } from 'react-redux';


const Auth = () => {
  const [signUp, setSignUp] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({firstname:'', lastname:'', username:'', email:'', password:'', confirmPwd: ''});


  const handleSubmit = (e) => {
       e.preventDefault();
       console.log(formData);
       
       if(signUp) {
        dispatch(signup(formData))


       }else{
        console.log('profile data' +JSON.stringify(formData))
        dispatch(login(formData))
 
       }
       
       dispatch(logInProfile());
       navigate('/');
    }


  const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
    }
  const googleSuccess = async (res) => {
      console.log(res.credential, 'login ');
      console.log(  `clientId is ${res?.clientId}`)
      let result = jwt_decode(res?.credential);
      let token = res?.credential
      // console.log(result);

    try {
      dispatch(googleAuth({result, token}))
      dispatch({ type: 'AUTH', data: {result, token}});
      //route to home if you login successfully.
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  const googleFailure = (error) => {
      console.log(error);
      console.log('google sign in was unsuccessful. try again later')

  }

   
    return (

    <section className='flex flex-col items-center justify-center m-auto relative'>
    { signUp ? ( 
      <>
    <form className="border-slate-500 border border-solid  mb-1 flex items-center justify-center flex-col gap-10 bg-bg-color rounded-3xl p-5 "
      onSubmit={handleSubmit}
    >

     <h4 className='text-2xl'>Signup</h4>   
    <div className='flex gap-4 w-full'>
    <input 
    
         required 
         type="text" 
         className="h-8 bg-card-color rounded-md pl-2
         focus:outline-border-color focus:outline focus:outline-1" 
         name='firstname'
        //  value={firstname}
         placeholder="First name"
         onChange={(e) => handleChange(e)} 
         />
    <input 
         required 
         type="text" 
         className="h-8 bg-card-color rounded-md pl-2
         focus:outline-border-color focus:outline focus:outline-1" 
         name='lastname'
        //  value={lastname}
         placeholder="Last name"
         onChange={(e) => handleChange(e)} 
         />  
     </div>
     <div className='flex gap-4 w-full '>
      <input
        required 
        type="text"
        className="h-8 w-full bg-card-color rounded-md pl-2
        focus:outline-border-color focus:outline focus:outline-1" 
        name="username"
        // value={username}
        placeholder="Username"
        onChange={(e) => {
          handleChange(e)
        }} 
         />   
     </div>  
     <div className='flex gap-4 w-full'>
      <input
        required 
        type="email"
        className="h-8 w-full bg-card-color rounded-md pl-2
        focus:outline-border-color focus:outline focus:outline-1" 
        name="email"
        // value={email}
        placeholder="Email"
        onChange={(e) => handleChange(e)} 
         />   
     </div>    
     <div className='flex gap-4 w-full relative'>
      {/* <div> */}
        <input
          required 
          type={showPwd ? "text" :"password"}
          className="h-8 w-full bg-card-color rounded-md pl-2
          focus:outline-border-color focus:outline focus:outline-1 " 
          name="password"
          // value={password}
          placeholder="Password"
          onChange={(e) => handleChange(e)} 
          
          /> 
        <span 
          className="absolute right-[5%] top-[25%] cursor-pointer "
          onClick={()=>setShowPwd((prev) => !prev)}
        >{showPwd ?<RiEyeCloseLine /> : <RiEyeFill />}
        </span> 
      {/* </div> */}
      </div>
      <div className='flex gap-4 w-full relative'>
      {/* <div>   */}
        <input
          required 
          type={showConfirmPwd ? "text" :"password"}
          className="h-8 w-full bg-card-color rounded-md pl-2
          focus:outline-border-color focus:outline focus:outline-1" 
          name="confirmPwd"
          // value={confirmPwd}
          placeholder="Confirm password"
          onChange={(e) => handleChange(e)} 
          />  
        <span className="absolute right-[5%] top-[25%] cursor-pointer "
        onClick={()=>setShowConfirmPwd((prev) => !prev)}
        >{showConfirmPwd ?<RiEyeCloseLine /> : <RiEyeFill />}
        </span>    
      </div>   
      {/* </div> */}
    
     <div className='mt-5 flex-col items-center flex gap-4 w-full'>
     <button className='rounded-3xl bg-border-color
     text-bg-color px-2.5 py-1 w-[80%]
     border-none outline-none  text-xl
     transition-all ease-out duration-200
     cursor-pointer 
     hover:text-white
     hover:outline-2  hover:outline-solid hover:outline-slate-200
     hover:bg-bg-color' type='submit'>SignUp</button>    
     <h6>OR</h6>  
     <GoogleLogin 
              
            
              //  render={(renderProps) => (
              //     <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
              //         Google Sign In
              //     </Button>
              //  )}
               onSuccess={googleSuccess}
               onError={googleFailure}
              //  cookiePolicy="single_host_origin"
              />
      </div>          
     
    </form>     
   
    <h6>Already have an account? &nbsp;&nbsp;<span className="cursor-pointer hover:text-slate-500" onClick={()=>setSignUp(false)}>Login.</span></h6>
    </> ) : (<>
      <form className="w-full border-slate-500 border border-solid  mb-1 flex items-center justify-center flex-col gap-10 bg-bg-color rounded-3xl p-6 "
           onSubmit={handleSubmit}>
    <h4 className='text-2xl'>Login</h4>   
    
    <div className='flex gap-4 w-full'>
    <input
        required 
        type="text"
        className="h-8  w-full bg-card-color rounded-md pl-2
        focus:outline-border-color focus:outline focus:outline-1" 
        name="email"
        // value={username}
        placeholder="Email"
        onChange={(e) => handleChange(e)} 
        />   
    </div>  
    

    <div  className='flex gap-4 w-full relative'>
        <input
        required 
        type={showPwd ? "text" :"password"}
        className="h-8 w-full bg-card-color rounded-md pl-2
        focus:outline-border-color focus:outline focus:outline-1" 
        // value={password}
        name="password"
        placeholder="Password"
        onChange={(e) => handleChange(e)} 
        /> 
        <span 
        className="absolute  right-[5%] top-[25%] cursor-pointer"
        onClick={()=>setShowPwd((prev) => !prev)}
        >{showPwd ?<RiEyeCloseLine /> : <RiEyeFill />}
        </span> 
        </div>  

   
    
    <div className='flex-col items-center flex gap-4 w-full'>
    <button className='mt-5 rounded-3xl bg-border-color
     text-bg-color px-2.5 py-1  w-full
     border-none outline-none  text-xl
     transition-all ease-out duration-200
     cursor-pointer 
     hover:text-white
     hover:outline-2  hover:outline-solid hover:outline-slate-200
     hover:bg-bg-color'>Login</button>      
     <h6>OR</h6>  
     <GoogleLogin 
              
            
              //  render={(renderProps) => (
              //     <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
              //         Google Sign In
              //     </Button>
              //  )}
               onSuccess={googleSuccess}
               onError={googleFailure}
              //  cookiePolicy="single_host_origin"
              />
      </div>       
    </form>
    <h6>Don't have an account? &nbsp;&nbsp;<span className="cursor-pointer hover:text-slate-500" onClick={()=>setSignUp(true)}> Signup.</span></h6>   
    </>

    
    )
}
  </section>

   

    )
  
  
}

export default Auth