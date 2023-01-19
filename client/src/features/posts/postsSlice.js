import * as api from '../../api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
   posts: [],
   totalPages: 0,
   isLoading: false,
}

export const getPosts = createAsyncThunk(
    'posts/getPosts', async(page) => {
        try {
            const {data} = await api.fetchPosts(page);
            console.log('data is ' + data)
            return data;
        } catch (error) {
           console.log(error)   
        }
       
    }
);

export const getPostsBySearch = createAsyncThunk(
    'posts/getPostsBySearch', async(searchQuery) => {
        const { data : {data} } = await api.fetchPostsBySearch(searchQuery);
        console.log('search data is ' + JSON.stringify(data))
        return data;
    }
) 

export const createPost = createAsyncThunk(
    'posts/createPost', async(post) => {
        try {
            const {data} = await api.createPost(post);
            return data;
            
        } catch (error) {
            console.log(error)
        }
    }
);


export const updatePost = createAsyncThunk(
    'posts/updatePost', async(dataObj) => {
        try {
            
            const {data} = await api.updatePost(dataObj.currentId, dataObj.postData);
            return data;
        } catch (error) {
            console.log(error)
        }
    }
);

export const deletePost = createAsyncThunk(
    'posts/deletePost', async(id) => {
      try {
         await api.deletePost(id);
        return id;
      } catch (error) {
        console.log(error)
      }
    }
);

export const likePost = createAsyncThunk(
    'posts/likePost', async(id) => {
        try {
            const {data} = await api.likePost(id);
            return data;
        } catch (error) {
            console.log(error)
        }
      
    }
)

export const getPost = createAsyncThunk(
    'posts/getPost', async(id) => {
        try {
            const { data } = await api.getPost(id);
            return data;
        } catch (error) {
            console.log(error)
        }
    }
 )


export const commentPost = createAsyncThunk(
    'posts/commentPost', async(dataObj) => {
      try {
        console.log('dataObj' + dataObj.id)
        const { data } = await api.commentPost(dataObj.value,dataObj.commentorIconImg, dataObj.id);
        console.log('comment post ' +  data)
        return data
      } catch (error) {
         console.log(error)
      }
    }
) 

export const getUserPosts = createAsyncThunk(
    'posts/getUserPosts', async(dataObj) =>{
        try {
            const { data }  = await api.getUserPosts(dataObj.creator, dataObj.page);
        
            return data;

        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteComment = createAsyncThunk(
    'posts/deleteComment', async(dataObj) => {
        try {
            console.log('data obj' + JSON.stringify(dataObj))
            const { data } = await api.deleteComment(dataObj.postId, dataObj.commentId);
           console.log('commentID is ' + JSON.stringify(data))
            return data;

        } catch (error) {
            console.log(error)
        }
    }
)
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getPosts.pending, (state, action) => {
         state.isLoading = true;
        
        })
        .addCase(getPosts.fulfilled, (state, action) => { 
            state.isLoading = false;
            state.posts = action.payload.posts;
            state.totalPages = action.payload.totalPages
        })
        .addCase(getPosts.rejected, (state, action) => {
            console.log(action.error)
        })
        .addCase(getPostsBySearch.pending,(state, action) => {
            state.isLoading = true;
        
        })
        .addCase(getPostsBySearch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = action.payload;
            console.log('state posts is ' + state)
        })
        .addCase(getPostsBySearch.rejected,(state, action) => {
            console.log(action.error)
        
        })
        .addCase(createPost.pending,(state, action) => {
            state.isLoading = true;
        
        })
        .addCase(createPost.fulfilled, (state, action) => {
            state.isLoading = false;
            if(state.posts.length > 6) state.posts.pop();
            state.posts = [action.payload, ...state.posts]
        })
        .addCase(createPost.rejected,(state, action) => {
            console.log(action.error)
        
        })
        .addCase(updatePost.pending,(state, action) => {
            state.isLoading = true;
        
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = state.posts.map((post) => 
            post._id === action.payload._id ? action.payload : post)
        })
        .addCase(updatePost.rejected,(state, action) => {
            console.log(action.error)
        
        })
        .addCase(getPost.pending,(state, action) => {
            state.isLoading = true;
        
        })
        .addCase(getPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = [action.payload]
        })
        .addCase(getPost.rejected,(state, action) => {
            console.log(action.error)
        
        })
        .addCase(deletePost.pending,(state, action) => {
            state.isLoading = true;
        
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = state.posts.filter((post) => post._id !== action.payload)

        })
        .addCase(deletePost.rejected,(state, action) => {
            console.log(action.error)
        
        })
        .addCase(commentPost.pending,(state, action) => {
            state.isLoading = true;
        
        })
        .addCase(commentPost.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = state.posts.map((post) => 
            post._id === action.payload._id ? action.payload : post)
    
        })
        .addCase(commentPost.rejected,(state, action) => {
            console.log(action.error)
        
        })
        .addCase(getUserPosts.pending,(state, action) => {
            state.isLoading = true;
        
        })
        .addCase(getUserPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts = action.payload.posts;
            state.totalPosts = action.payload.totalPosts;
            state.totalPages = action.payload.totalPages;
        })
        .addCase(getUserPosts.rejected,(state, action) => {
            console.log(action.error)
        
        })
        .addCase(deleteComment.pending,(state, action) => {
            state.isLoading = true;
        
        })
        .addCase(deleteComment.fulfilled, (state,action) => {
            state.isLoading = false;
            state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
    
        })
        .addCase(deleteComment.rejected,(state, action) => {
            console.log(action.error)
        
        })
       },

    //    fetchBySearch: (state, action) => {
    //     state.posts = action.payload

    //    },

    //    createPost: (state, action) => {
    //     if(state.posts.length > 6) state.posts.pop();
    //     state.posts = [action.payload, ...state.posts]
    //    },

    //    updatePost: (state, action) => {
    //     state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
    //    },

    //    getPost: (state, action) => {
    //     state.posts = [action.payload]
    //    },

    //    deletePost: (state, action) => {
    //     state.posts = state.posts.filter((post) => post._id !== action.payload )
    //    },

    //    comment: (state, action) => {
    //     state.posts = state.posts.map((post) => {
    //         //change the post that just received a comment
    //         if(post._id === action.payload._id){
    //             return action.payload;
    //         }
    //         //return all the other posts normally
    //         return post;
    //     })
    //    },

    //    getUserPosts: (state, action) => {
    //     state.posts = action.payload.posts,
    //     state.totalPosts = action.payload.totalPosts, 
    //     state.totalPages = action.payload.totalPages
    //    },

    //    deleteComment: (state,action) => {
    //     state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
    //    }

    
    
})

// case START_LOADING:
//     return {...state, isLoading: true};
    
// case END_LOADING:
//     return {...state, isLoading: false};

// case FETCH_ALL:
//     return  {...state, posts:action.payload.posts, totalPages:action.payload.totalPages};


// case FETCH_BY_SEARCH:
//      return { ...state, posts: action.payload };
     
// case CREATE:
//     //pop() last element from posts array to display 5 posts
//     //  state.posts.pop();
//     if(state.posts.length > 6) state.posts.pop();
//     return {...state, posts:[action.payload, ...state.posts]}  

// case UPDATE:
//     return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}

// case GET_POST:
//     // return {...state, posts: state.posts.filter((post) => post._id === action.payload._id )}
//     return {...state, posts: [action.payload] }

// case DELETE: 
//     return {...state, posts: state.posts.filter((post) => post._id !== action.payload )};


// case COMMENT:
//     return {
//         ...state,
//         posts: state.posts.map((post) => {
//             //change the post that just received a comment
//             if(post._id === action.payload._id){
//                 return action.payload;
//             }
//             //return all the other posts normally
//             return post;
//         })
//     }    

// case GET_USER_POSTS:
//     return  {...state, posts:action.payload.posts, totalPosts: action.payload.totalPosts, totalPages:action.payload.totalPages};


// case DELETE_COMMENT:
//     return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }    
//     // return {...state, posts: state.posts.filter((post) => post._id === action.payload._id ) }    

// default: 
//     return state; 
// export const { 
//     getPosts,
//     fetchBySearch,
//     createPost,
//     updatePost,
//     getPost,
//     deletePost,
//     comment,
//      getUserPosts,
//     deleteComment }  = postsSlice.actions;

// export const allPosts = (state) => state.posts.posts;
// export const allPages = (state) => state.posts.totalPages;
// export const postsStatus = (state) => state.posts.loading;

export default postsSlice.reducer;