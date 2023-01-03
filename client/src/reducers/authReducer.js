import { AUTH, LOGOUT, GET_PROFILE } from '../constants/actionType';

const authReducer = (state = {authData: null }, action) => {
    switch(action.type ) {
        case AUTH:
          localStorage.setItem('profile', JSON.stringify({...action?.data}))  
          console.log(state);
          return {...state, authData: action?.data};

        case LOGOUT: 
         localStorage.clear();
         return {...state, authData: null};  

       
        default: 
             return state;
    }
}

export default authReducer