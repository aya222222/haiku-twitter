import * as api from '../api';
import {GET_CREATOR_PROFILE, UPDATE_CREATORS_FOLLOW_STATUS} from '../constants/actionType';

export const getCreatorProfile = (creator) => async(dispatch) => {
    try {
    
      const { data }  = await api.getCreatorProfile(creator);
      console.log('data is' + data)
      dispatch( { type: GET_CREATOR_PROFILE, payload: data } );
      
      return data;
    } catch (error) {
      console.log(error);
    }
  } 


  export const updateCreatorFollowStatus = (creator) => async(dispatch) => {
    try {
      const { data } = await api.updateCreatorFollowStatus(creator);
      dispatch( { type: UPDATE_CREATORS_FOLLOW_STATUS, payload: data })
      console.log('followed', data)
    } catch (error) {
      console.log(error);
    }
  }