
import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, COMMENT, GET_USER_POSTS, GET_POST, DELETE_COMMENT } from '../constants/actionType';

export default (state = { isLoading: false, posts:[]}, action) => {
    switch(action.type) {
        case START_LOADING:
            return {...state, isLoading: true};
            
        case END_LOADING:
            return {...state, isLoading: false};

        case FETCH_ALL:
            return  {...state, posts:action.payload.posts, totalPages:action.payload.totalPages};
        
       
        case FETCH_BY_SEARCH:
             return { ...state, posts: action.payload };
             
        case CREATE:
            //pop() last element from posts array to display 5 posts
            //  state.posts.pop();
            if(state.posts.length > 6) state.posts.pop();
            return {...state, posts:[action.payload, ...state.posts]}  
       
        case UPDATE:
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}
        
        case GET_POST:
            // return {...state, posts: state.posts.filter((post) => post._id === action.payload._id )}
            return {...state, posts: [action.payload] }
      
        case DELETE: 
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload )};
    
    
        case COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    //change the post that just received a comment
                    if(post._id === action.payload._id){
                        return action.payload;
                    }
                    //return all the other posts normally
                    return post;
                })
            }    

        case GET_USER_POSTS:
            return  {...state, posts:action.payload.posts, totalPosts: action.payload.totalPosts, totalPages:action.payload.totalPages};
        
        
        case DELETE_COMMENT:
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }    
            // return {...state, posts: state.posts.filter((post) => post._id === action.payload._id ) }    
        
        default: 
            return state;     
        }

}