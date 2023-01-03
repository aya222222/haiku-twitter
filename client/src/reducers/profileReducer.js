import { GET_PROFILE, CREATE_PROFILE, UPDATE_PROFILE, FOLLOW_OR_UNFOLLOW, LOGOUT_PROFILE, LOGIN_PROFILE } from '../constants/actionType';

const profileReducer = (state = { loggedIn: true, following:[], follower:[]}, action) => {
    switch(action.type){
      case GET_PROFILE:
  
        return  {...state, ...action.payload}
        //  {
        //   ...state,
        //   userId: action.payload.userId,
        //   username: action.payload.username,
        //   profileBgImg:  action.payload.profileBgImg,
        //   profileIconImg: action.payload.profileIconImg,
        //   bio: action.payload.bio,
        //   totalPosts: action.payload.toalPosts,
        //   follower: [...action.payload.follower],
        //   following:  [...action.payload.following]
        // }
     
        // return profiles.find((profile) => profile.userId === action.payload.userId);
     
        case CREATE_PROFILE:
   
        // return {...state, profileData:action?.data}
         return {...state, ...action?.payload}

        case UPDATE_PROFILE:
  
         return {...state, ...action?.payload}
       
        case  FOLLOW_OR_UNFOLLOW:
          
          return {...state, following:[...action.payload.following]}
        
       case LOGOUT_PROFILE:
        
     
        return {
          loggedIn : false, 
          // bio: '',
          // profileBgImg: '',
          // profileIconImg:'',
          // username: ''
        }

        case LOGIN_PROFILE:
        
     
          return {
            loggedIn : true, 
            // bio: '',
            // profileBgImg: '',
            // profileIconImg:'',
            // username: ''
          }
      default: 
       return state;    
    } 
}

export default profileReducer