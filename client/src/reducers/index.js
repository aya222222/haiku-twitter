import { combineReducers } from "redux";
import postsReducer from './postsReducer.js'
import authReducer from "./authReducer.js";
import profileReducer from './profileReducer.js';
import creatorProfileReducer from './creatorProfileReducer.js'
import targetCreatorProfileReducer from "./targetCreatorProfileReducer.js";
export default combineReducers({
    postsReducer,
    authReducer,
    profileReducer,
    creatorProfileReducer,
    targetCreatorProfileReducer
})