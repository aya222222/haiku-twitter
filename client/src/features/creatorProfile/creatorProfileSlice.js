import * as api from '../../api'
import { applyMiddleware, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    following: [],
    follower: []
}


export const getCreatorProfile = createAsyncThunk(
    'creatorProfile/getCreatorProfile', async(creator) => {
        try {
            const {data} = await api.getCreatorProfile(creator);
            return data;
        } catch (error) {
           console.log(error)   
        }
       
    }
);

export const updateCreatorFollowStatus = createAsyncThunk(
    'creatorProfile/updateCreatorFollowStatus', async(creator) => {
        try {
            const { data } = await api.updateCreatorFollowStatus(creator);
            return data;
        } catch (error) {
            console.log(error)   
        }
    }
);

export const creatorProfileSlice = createSlice({
    name: 'creatorProfile',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(getCreatorProfile.pending, (state, action) => {
            console.log('loading')
            
            })
        .addCase(getCreatorProfile.fulfilled, (state, action) => {
            return {...state, ...action?.payload}
           
           })
        .addCase(getCreatorProfile.rejected, (state, action) => {
            console.log(action?.error)
            
            })   
        .addCase(updateCreatorFollowStatus.pending, (state, action) => {
            console.log('loading')
            
            })    
        .addCase(updateCreatorFollowStatus.fulfilled, (state, action) => {
            state.follower = action.payload.follower
          
           })
        .addCase(updateCreatorFollowStatus.rejected, (state, action) => {
           console.log(action?.error)
        
            })      
    }
})



export default creatorProfileSlice.reducer;