import * as api from '../../api'
import { applyMiddleware, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
   authData: null
}

export const login = createAsyncThunk(
    'auth/login', async(formData) => {
        try {
            console.log('profile' + JSON.stringify(formData))

            const { data } = await api.logIn(formData);
            return data;

        } catch (error) {
           console.log(error)   
        }
       
    }
);


export const signup = createAsyncThunk(
    'auth/signup', async(formData) => {
        try {
            const { data } = await api.signUp(formData);
            
            return data;

        } catch (error) {
           console.log(error)   
        }
       
    }
);

export const logOut = createAsyncThunk(
    'auth/logOut', async() => {
        try {
            localStorage.clear();        

        } catch (error) {

           console.log(error)   
        }
       
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(login.fulfilled, (state, action) => {
            console.log('action ' + action.payload)
            localStorage.setItem('profile', JSON.stringify(action?.payload))  
            return {
                ...state, 
                authData: action?.payload
            };
           
           })
           .addCase(signup.fulfilled, (state, action) => {
            localStorage.setItem('profile', JSON.stringify(action?.payload))  
            return {
                ...state, 
                authData: action?.payload
            };
        
           })
           .addCase(logOut.fulfilled, (state, action) => {
            return {
                ...state, 
                authData: null
            };  
           })
          
    }
})

export default authSlice.reducer;