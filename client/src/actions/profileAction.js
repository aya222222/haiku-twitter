import * as api from '../api';
import { GET_PROFILE, CREATE_PROFILE, UPDATE_PROFILE, FOLLOW_OR_UNFOLLOW, LOGOUT_PROFILE, LOGIN_PROFILE } from '../constants/actionType';

export const getProfile = () => async(dispatch) => {
    try {
      // const {data} = await api.getProfile(userId);
      const {data} = await api.getProfile();
       console.log('data is ' + JSON.stringify(data))
        dispatch({ type: GET_PROFILE, payload: data})
    
    } catch (error) {
      console.log(error);
    }
  }

  export const createProfile = (profileData) => async (dispatch) => {
    try {
        const {data} = await api.createProfile(profileData);
        console.log(data)
        dispatch({ type: CREATE_PROFILE , payload: data });
       
    } catch (error) {
        console.log(error);   
    }
}

export const updateProfile = (id, profileData) => async (dispatch) => {
  try {
      const {data} = await api.updateProfile(id, profileData);
      console.log('logged in user '+ data)
      dispatch({ type: UPDATE_PROFILE, payload: data })
  } catch (error) {
      console.log(error)
  }
}

export const followOrUnfollowCreator = (creator) => async (dispatch) => {
  try {
        const { data } = await api.followOrUnfollowCreator(creator);
        console.log('following ' + data)
        dispatch({ type: FOLLOW_OR_UNFOLLOW, payload: data })
      } catch (error) {
        console.log(error);
}
}

export const logoutProfile = () => async (dispatch) => {
  try { 
    console.log('logout dispatched ')
    dispatch({ type: LOGOUT_PROFILE })

 
  } catch (error) {
    console.log(error)
  }
}

export const logInProfile = () => async (dispatch) => {
  try { 
    console.log('login dispatched ')
    dispatch({ type: LOGIN_PROFILE })

 
  } catch (error) {
    console.log(error)
  }
}