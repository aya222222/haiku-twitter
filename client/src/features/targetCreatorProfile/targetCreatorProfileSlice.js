import * as api from '../../api'
import { applyMiddleware, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    following: [],
    follower: []
}

export const updateTargetCreatorFollowStatus = createAsyncThunk(
    'targetCreatorProfile/updateTargetCreatorFollowStatus', async(creator) => {
        try {
            const { data } = await api.updateTargetCreatorFollowStatus(creator);
            return data;
        } catch (error) {
           console.log(error)   
        }
       
    }
);

export const targetCreatorProfileSlice = createSlice({
    name: 'targetCreatorProfile',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(updateTargetCreatorFollowStatus.pending, (state, action) => {
            console.log('loading')
           
           })
        .addCase(updateTargetCreatorFollowStatus.fulfilled, (state, action) => {
            state.follower =  action.payload.follower;
          
           })
        .addCase(updateTargetCreatorFollowStatus.rejected, (state, action) => {
            console.log(action.error)
           
           })    
        
    }
})



export default targetCreatorProfileSlice.reducer;