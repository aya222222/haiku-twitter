import React, { useState, useRef  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FollowCard from '../followCard/FollowCard'
import { useParams } from 'react-router-dom'
import  './FollowAndPostsCards.css'
import ProfileSide from '../profileSide/ProfileSide'
import RightSide from '../rightSide/RightSide'
import { useEffect } from 'react'
import { getProfile } from '../../actions/profileAction'
import CreatorsProfileCard from '../creatorsProfileCard/CreatorsProfileCard'
import LogoSearch from '../logoSearch/LogoSearch'
//followersList, followingList,  listOfFollowers
const FollowList = ({
  listOfFollowers, 
  listOfFollowing, 
  listOfCreatorFollowers, 
  listOfCreatorFollowing,
  setListOfFollowers,
  setListOfFollowing,
  setListOfCreatorFollowers,
  setListOfCreatorFollowing,
  tags,
  setTags
}) => {
  
const {follower: followersList, following: followingList} = useSelector((state) => state.profile);
const {follower: followersOfCreator, following: followingOfCreator} = useSelector((state) => state.creatorProfile);



//  const { followersList, followingList} = useSelector((state) => state.profileReducer)
//  const followersList = useSelector((state) => state.profileReducer.follower)
//  const followingList = useSelector((state) => state.profileReducer.following)
//  const [followersList, setFollowersList] = useState(Array.from(follower))
//  const [followingList, setFollowingList] = useState(Array.from(following))
// console.log('profile data is ' + useSelector((state) => JSON.stringify(state.profileReducer)))



 return (

<div className="w-full flex flex-col justify-center items-center">
<div className='lg:hidden flex w-full justify-center mt-5 mx-0
       pb-5
     '>
      <LogoSearch 
        tags={tags}
        setTags={setTags}
      />
 </div> 
     <CreatorsProfileCard 
          listOfFollowers={listOfFollowers}
          setListOfFollowers={setListOfFollowers}
          listOfFollowing={listOfFollowing}
          setListOfFollowing={setListOfFollowing}
          listOfCreatorFollowers={listOfCreatorFollowers} 
          setListOfCreatorFollowers={setListOfCreatorFollowers}
          listOfCreatorFollowing={listOfCreatorFollowing} 
          setListOfCreatorFollowing={setListOfCreatorFollowing}
       />


<div className="w-[85%] md:w-full flex flex-col justify-start items-center gap-4 bg-bg-color 
      my-5 mx-0 rounded-3xl min-h-fit">

    { ( listOfFollowers && followersList?.length)  &&
       followersList?.map(follower => {
        return (
          <FollowCard 
            key={follower._id}
            follow={follower} 
            followingList={followingList} />
         )
         }
          ) 
        }
        {( listOfFollowing && followingList?.length) &&
        followingList?.map(following => {
            return (
              <FollowCard 
                key={following._id}
                follow={following} 
                followingList={followingList}
              />
             )
             }
              )     
            }
       { ( listOfCreatorFollowers && followersOfCreator?.length)  &&
        followersOfCreator?.map(creatorFollower => {
        return (
          <FollowCard 
            key={creatorFollower._id}
            follow={creatorFollower} 
            followingList={followingOfCreator}
            />
         )
         }
          ) 
        }
        {( listOfCreatorFollowing && followingOfCreator?.length) &&
        followingOfCreator?.map(creatorFollowing => {
            return (
              <FollowCard 
                key={creatorFollowing._id}
                follow={creatorFollowing} 
                followingList={followingOfCreator}
              />
             )
             }
              )     
            }      
   </div>



   
</div>
   ) 
   

        
  
}

export default FollowList