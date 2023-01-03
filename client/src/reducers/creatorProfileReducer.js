import {  GET_CREATOR_PROFILE, UPDATE_CREATORS_FOLLOW_STATUS } from '../constants/actionType';

const creatorProfileReducer = (state = {following:[], follower:[]}, action) => {
    switch(action.type){
      
        case GET_CREATOR_PROFILE:
        
             return {...state, ...action?.payload} 
       
        case UPDATE_CREATORS_FOLLOW_STATUS:
              
             return {...state, follower : action.payload.follower}

      default: 
       return state;    
    } 
}

export default creatorProfileReducer