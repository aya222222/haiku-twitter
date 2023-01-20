
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/home/Home';
import EditProfile from './pages/editProfile/EditProfile';
import Auth from './pages/auth/Auth';

import PostSide from './components/postSide/PostSide';
import Comments from './components/comments/Comments';
import {ErrorBoundary} from 'react-error-boundary'
import { GoogleOAuthProvider} from '@react-oauth/google'
import FollowList from './components/followAndPostsCards/FollowList';
import CreateHaiku from './components/createHaiku/CreateHaiku';
import EditProfileMobile from './components/editProfileMobile/EditProfileMobile';

function ErrorHandler({error}) {
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

function App() {
  const [openHaikuModal, setOpenHaikuModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [openLikeModal, setOpenLikeModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [editFlag, setEditFlag] = useState(false);
  const [listOfFollowers, setListOfFollowers] = useState(false);
  const [listOfFollowing, setListOfFollowing] = useState(false);
  const [listOfCreatorFollowers, setListOfCreatorFollowers] = useState(false)
  const [listOfCreatorFollowing, setListOfCreatorFollowing] = useState(false)
  // const {follower: followersList, following: followingList} = useSelector((state) => state.profileReducer);
  
  
  // const user = JSON.parse(localStorage.getItem('profile'));
  // const userId = user.result._id || user.result.sub;

//  const clickOutSide = (e, setModal) => {
//   if(e.target == e.currentTarget) {
//     setModal(false);
//    console.log( e.target.style.display) 
//   }
//   }
 
  // const checkTextExists = (e, inputtedText, setModal) => {
  //   if(e.target == e.currentTarget){
  //  if(inputtedText != '' || bio != ''){
  //    setOpenDeleteAlertModal(true)
  //  } else {
  //    setModal(false);
  //  }
  // }
  // }

  // const clickCloseModal = (e, setInputtedText, setModal, setBio) => {
  //   if(e.target == e.currentTarget) {
  //    setInputtedText('');
  //    console.log(setBio)
  //    if(setBio)setBio('');

  //    setOpenDeleteAlertModal(false);
  //    setModal(false);
  
  //    console.log( e.target.style.display) 
  //   }
  //   }


  return (
    <GoogleOAuthProvider 
    clientId="376153901636-c4k1mt2c3fguf829g28gpsu2t0fpgvqm.apps.googleusercontent.com"
    >
  <div className=" w-full flex flex-col m-auto bg-bg-color min-h-screen text-white"> 
  <ErrorBoundary FallbackComponent={ErrorHandler}>

     <Router>
      <Routes>
       <Route path="/" exact element={ <Navigate to="/posts" /> } /> 
       <Route path='/posts' exact element={<Home 
          openHaikuModal={openHaikuModal} 
          setOpenHaikuModal={setOpenHaikuModal}
          openProfileModal={openProfileModal} 
          setOpenProfileModal={setOpenProfileModal}
          openLikeModal={openLikeModal}
          setOpenLikeModal={setOpenLikeModal}
          tags={tags} 
          setTags={setTags} 
          currentId={currentId}
          setCurrentId={setCurrentId}
          editFlag={editFlag} setEditFlag={setEditFlag}
          listOfFollowers={listOfFollowers}
          setListOfFollowers={setListOfFollowers}
          listOfFollowing={listOfFollowing}
          setListOfFollowing={setListOfFollowing}
          listOfCreatorFollowers={listOfCreatorFollowers} 
          setListOfCreatorFollowers={setListOfCreatorFollowers}
          listOfCreatorFollowing={listOfCreatorFollowing} 
          setListOfCreatorFollowing={setListOfCreatorFollowing}
       />} >
        <Route path='' element={ <PostSide 
          currentId={currentId}
          setCurrentId={setCurrentId}
          openHaikuModal={openHaikuModal} 
          setOpenHaikuModal={setOpenHaikuModal}
          openLikeModal={openLikeModal}
          setOpenLikeModal={setOpenLikeModal}
          tags={tags}
          setTags={setTags}
          editFlag={editFlag} setEditFlag={setEditFlag}
          // listOfFollowers={listOfFollowers}
          // setListOfFollowers={setListOfFollowers}
          // listOfFollowing={listOfFollowing}
          // setListOfFollowing={setListOfFollowing}
          // listOfCreatorFollowers={listOfCreatorFollowers} 
          // setListOfCreatorFollowers={setListOfCreatorFollowers}
          // listOfCreatorFollowing={listOfCreatorFollowing} 
          // setListOfCreatorFollowing={setListOfCreatorFollowing}
          />}/>
       
  
 <Route path={`:id/follower`} exact element={<FollowList  
          // followersList={followersList}
          // followingList = {followingList}
          // listOfFollowers={listOfFollowers}
          listOfFollowers={listOfFollowers}
          setListOfFollowers={setListOfFollowers}
          listOfFollowing={listOfFollowing}
          setListOfFollowing={setListOfFollowing}
          listOfCreatorFollowers={listOfCreatorFollowers} 
          setListOfCreatorFollowers={setListOfCreatorFollowers}
          listOfCreatorFollowing={listOfCreatorFollowing} 
          setListOfCreatorFollowing={setListOfCreatorFollowing}
          tags={tags}
          setTags={setTags}
          />} /> 
       <Route path={`:id/following`} exact element={<FollowList  
          // followersList={followersList}
          // followingList = {followingList}
          listOfFollowers={listOfFollowers}
          setListOfFollowers={setListOfFollowers}
          listOfFollowing={listOfFollowing}
          setListOfFollowing={setListOfFollowing}
          listOfCreatorFollowers={listOfCreatorFollowers} 
          setListOfCreatorFollowers={setListOfCreatorFollowers}
          listOfCreatorFollowing={listOfCreatorFollowing} 
          setListOfCreatorFollowing={setListOfCreatorFollowing}
          tags={tags}
          setTags={setTags}
         />} /> 
        </Route> 

       <Route path="/posts/search" exact element={<Home 
        openHaikuModal={openHaikuModal} 
        setOpenHaikuModal={setOpenHaikuModal}
        openLikeModal={openLikeModal}
        setOpenLikeModal={setOpenLikeModal}
        openProfileModal={openProfileModal} 
        setOpenProfileModal={setOpenProfileModal}
        tags={tags} 
        setTags={setTags} 
     
      />}  >
         <Route path='' element={ <PostSide 
          currentId={currentId}
          setCurrentId={setCurrentId}
          openHaikuModal={openHaikuModal} 
          setOpenHaikuModal={setOpenHaikuModal}
          openLikeModal={openLikeModal}
          setOpenLikeModal={setOpenLikeModal}
          tags={tags}
          setTags={setTags}
          editFlag={editFlag} setEditFlag={setEditFlag}
          />}/>
        </Route> 
       <Route path="/posts/:creator" exact element={<Home 
          openHaikuModal={openHaikuModal} 
          setOpenHaikuModal={setOpenHaikuModal}
          openProfileModal={openProfileModal} 
          setOpenProfileModal={setOpenProfileModal}
          openLikeModal={openLikeModal}
          setOpenLikeModal={setOpenLikeModal}
          tags={tags} 
          setTags={setTags}
          listOfFollowers={listOfFollowers}
          setListOfFollowers={setListOfFollowers}
          listOfFollowing={listOfFollowing}
          setListOfFollowing={setListOfFollowing}
          listOfCreatorFollowers={listOfCreatorFollowers} 
          setListOfCreatorFollowers={setListOfCreatorFollowers}
          listOfCreatorFollowing={listOfCreatorFollowing} 
          setListOfCreatorFollowing={setListOfCreatorFollowing}
          />}  >
         <Route path='' element={ <PostSide 
          currentId={currentId}
          setCurrentId={setCurrentId}
          openHaikuModal={openHaikuModal} 
          setOpenHaikuModal={setOpenHaikuModal}
          openLikeModal={openLikeModal}
          setOpenLikeModal={setOpenLikeModal}
          tags={tags}
          setTags={setTags}
          editFlag={editFlag} setEditFlag={setEditFlag}
          listOfFollowers={listOfFollowers}
          setListOfFollowers={setListOfFollowers}
          listOfFollowing={listOfFollowing}
          setListOfFollowing={setListOfFollowing}
          listOfCreatorFollowers={listOfCreatorFollowers} 
          setListOfCreatorFollowers={setListOfCreatorFollowers}
          listOfCreatorFollowing={listOfCreatorFollowing} 
          setListOfCreatorFollowing={setListOfCreatorFollowing}
         
          />}/>
        </Route> 
        <Route path="/posts/post/:postId" exact element={<Home 
        openHaikuModal={openHaikuModal} 
        setOpenHaikuModal={setOpenHaikuModal}
        openLikeModal={openLikeModal}
        setOpenLikeModal={setOpenLikeModal}
        openProfileModal={openProfileModal} 
        setOpenProfileModal={setOpenProfileModal}
        tags={tags} 
        setTags={setTags}/>}>
          <Route path='' element={ <PostSide 
            currentId={currentId}
            setCurrentId={setCurrentId}
            openHaikuModal={openHaikuModal} 
            setOpenHaikuModal={setOpenHaikuModal}
            openLikeModal={openLikeModal}
            setOpenLikeModal={setOpenLikeModal}
            tags={tags}
            setTags={setTags}
            editFlag={editFlag} setEditFlag={setEditFlag}
            />}> 
          
          </Route>
        </Route>
       {/* <Route path={`/:id`}  exact element={<Home/>} />  */}
       
       <Route path='/create' exact element={<CreateHaiku 
          currentId={currentId}
          setCurrentId={setCurrentId}
          editFlag={editFlag}
          setEditFlag={setEditFlag}
          setOpenHaikuModal={setOpenHaikuModal}

       />} />

       <Route path='/editProfile' exact element={<EditProfileMobile 

       />} />
       
       <Route path="/auth" exact element={ <Auth />  } /> 
    
     </Routes>
     </Router>
     </ErrorBoundary>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;