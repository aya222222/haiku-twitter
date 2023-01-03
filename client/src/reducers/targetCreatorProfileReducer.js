import {  UPDATE_TARGET_CREATORS_FOLLOW_STATUS } from '../constants/actionType';

const targetCreatorProfileReducer = (state = {following:[], follower:[]}, action) => {
    switch(action.type){
      
       
        case UPDATE_TARGET_CREATORS_FOLLOW_STATUS:
              
             return {...state, follower : action.payload.follower}

      default: 
       return state;    
    } 
}

export default targetCreatorProfileReducer