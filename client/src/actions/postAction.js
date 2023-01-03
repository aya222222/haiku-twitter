import * as api from '../api';
import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, COMMENT, GET_USER_POSTS, GET_POST, DELETE_COMMENT,EDIT_COMMENT } from '../constants/actionType';
//action creators
export const getPosts = (page) => async (dispatch) => {

    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.fetchPosts(page);
        console.log(data)
        dispatch({ type: FETCH_ALL, payload: data })
        dispatch({ type: END_LOADING })

    } catch(error) {
        console.log(error);
    }
   
  
}

export const getPostsBySearch = (searchQuery) => async(dispatch) => {
    try {
        console.log(searchQuery)
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        console.log('searched is ' + JSON.stringify(data))
       dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        // dispatch({ type: START_LOADING });
        const {data} = await api.createPost(post);
         console.log('new post is ' + JSON.stringify(data))
        dispatch({ type: CREATE , payload: data })
        // dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);   
    }
}

export const updatePost = ( id, post ) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {data} = await api.updatePost(id, post);
        
        dispatch({ type: UPDATE, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        // dispatch({ type: START_LOADING });
        const { data } = await api.getPost(id);
        console.log('data is ' + JSON.stringify(data))
        dispatch({ type: GET_POST, payload: data })
        console.log('action id is ' + id)
        // dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (value, commentorIconImg, id) => async(dispatch) => {
  try {
   const { data } = await api.commentPost(value,commentorIconImg, id);
   console.log("comment is" + data);

   dispatch( { type: COMMENT, payload: data } );
 
   //it returns comments of the specific post
   return data.comments;

  } catch (error) {
    console.log(error);
  }
}

export const getUserPosts = (creator, page) => async(dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data }  = await api.getUserPosts(creator, page);
    console.log('getuserPosts')
    dispatch( { type: GET_USER_POSTS, payload: data } );
    dispatch({ type: END_LOADING })
 
  } catch (error) {
    console.log(error);
  }
} 

export const deleteComment = (postId, commentId) => async(dispatch) => {
    try {
    dispatch({ type: START_LOADING });
     const { data } = await api.deleteComment(postId, commentId);
     console.log('deleted comment data is ' + JSON.stringify(data))
  
     dispatch( { type: DELETE_COMMENT, payload: data } );
     dispatch({ type: END_LOADING })
     //it returns comments of the specific post
    //  return data.comments;
  
    } catch (error) {
      console.log(error);
    }
  }

//   export const editComment = (postId, commentId) => async(dispatch) => {
//     try {
//     dispatch({ type: START_LOADING });
//      const { data } = await api.editComment(postId, commentId);
//      console.log('data is ' + JSON.stringify(data))
  
//      dispatch( { type: EDIT_COMMENT, payload: data } );
//      dispatch({ type: END_LOADING })
//      //it returns comments of the specific post
//     //  return data.comments;
  
//     } catch (error) {
//       console.log(error);
//     }
//   }