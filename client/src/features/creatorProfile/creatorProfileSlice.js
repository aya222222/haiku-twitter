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
)
export const creatorProfileSlice = createSlice({
    name: 'creatorProfile',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(getCreatorProfile.fulfilled, (state, action) => {
           return {
            ...state,
            ...action?.payload
           }
           
           })
           .addCase(updateCreatorFollowStatus.fulfilled, (state, action) => {
            return {
                ...state, 
                follower : action.payload.follower
            }
           })
    }
})



export default creatorProfileSlice.reducer;