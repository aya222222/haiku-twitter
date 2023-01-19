import * as api from '../../api'
import { applyMiddleware, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
   authData: null
}

export const login = createAsyncThunk(
    'auth/login', async(formData) => {
        try {
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

export const googleAuth = createAsyncThunk(
    'auth/googleAuth', async(dataObj) => {
        try {
            return dataObj
        } catch (error) {
            
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(login.pending, (State, action) => {
            console.log('loading')
        })
        .addCase(login.fulfilled, (state, action) => {
           
            localStorage.setItem('profile', JSON.stringify(action?.payload))       
            state.authData = action?.payload

           })
        .addCase(login.rejected, (State, action) => {
            console.log(action?.error)
        })
        .addCase(signup.pending, (State, action) => {
            console.log('loading')
        })    
        .addCase(signup.fulfilled, (state, action) => {

            localStorage.setItem('profile', JSON.stringify(action?.payload));
            state.authData = action?.payload

           })
        .addCase(signup.rejected, (State, action) => {
            console.log(action?.error)
        })    
        .addCase(logOut.pending, (State, action) => {
            console.log('loading')
        }) 
        .addCase(logOut.fulfilled, (state, action) => {
           
            state.authData = null
           
           })
        .addCase(logOut.rejected, (State, action) => {
            console.log(action?.error)
        })     
        .addCase(googleAuth.fulfilled, (state, action) => {
            localStorage.setItem('profile', JSON.stringify(action?.payload));
            state.authData = action?.payload
        })
          
    }
})

export default authSlice.reducer;