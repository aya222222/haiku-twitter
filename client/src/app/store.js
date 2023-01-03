import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice';
import creatorProfileReducer from '../features/creatorProfile/creatorProfileSlice'
import profileReducer from '../features/profile/profileSlice'
import  targetCreatorProfileReducer  from "../features/targetCreatorProfile/targetCreatorProfileSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        profile: profileReducer,
        creatorProfile: creatorProfileReducer,
        targetCreatorProfile: targetCreatorProfileReducer,
        auth: authReducer

    }
})