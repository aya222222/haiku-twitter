import * as api from '../../api'
import { applyMiddleware, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedIn: true,
    following: [],
    follower: []
}

export const getProfile = createAsyncThunk(
    'profile/getProfile', async() => {
        try {
            const {data} = await api.getProfile();
            return data;
        } catch (error) {
           console.log(error)   
        }
       
    }
);

export const createProfile = createAsyncThunk(
    'profile/createProfile', async(profileData) => {
        try {
            const {data} = await api.createProfile(profileData);
            return data;
        } catch (error) {
           console.log(error)   
        }
       
    }
);

export const updateProfile = createAsyncThunk(
    'profile/updateProfile', async(id, profileData) => {
        try {
            const {data} = await api.updateProfile(id, profileData);
            return data;
        } catch (error) {
           console.log(error)   
        }
       
    }
);

export const followOrUnfollowCreator = createAsyncThunk(
    'profile/followOrUnfollowCreator', async(creator) => {
        try {
            const { data } = await api.followOrUnfollowCreator(creator);
            return data;
        } catch (error) {
           console.log(error)   
        }
       
    }
);

export const logoutProfile = createAsyncThunk(
    'profile/logoutProfile', async() => {
        try {
            console.log('logout dispatched ')
          
        } catch (error) {
           console.log(error)   
        }
       
    }
);

export const logInProfile = createAsyncThunk(
    'profile/logInProfile', async() => {
        try {
            console.log('login dispatched ')
          
        } catch (error) {
           console.log(error)   
        }
       
    }
);

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(getProfile.fulfilled, (state, action) => {
           return {
            ...state,
            ...action?.payload
           }
           
           })
           .addCase(createProfile.fulfilled, (state, action) => {
            return {
                ...state, 
                ...action?.payload
            }
           })
           .addCase(updateProfile.fulfilled, (state, action) => {
            return {
                ...state, 
                ...action?.payload
            }
           }) 
           .addCase(followOrUnfollowCreator.fulfilled, (state, action) => {
            return {
                ...state, 
                following:[...action.payload.following]
            }
           })
           .addCase(logoutProfile.fulfilled, (state, action) => {
            return {
               
                loggedIn : false
              }
           })
           .addCase(logInProfile.fulfilled, (state, action) => {
            return {
            
                loggedIn : true
              }
           })
    }
})



export default profileSlice.reducer;