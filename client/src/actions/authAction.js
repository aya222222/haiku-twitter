import * as api from '../api';
import { AUTH } from '../constants/actionType';

export const login = (formData, navigate) => async(dispatch) => {
  try {
    //login the user....
    const { data } = await api.logIn(formData);

    dispatch({type: AUTH, data});

    navigate('/');
  } catch (error) {
    console.log(error);
  }
}

export const signup = (formData, navigate) => async(dispatch) => {
    try {
      //signup the user....
      const { data } = await api.signUp(formData);

      dispatch({type: AUTH, data});
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

 