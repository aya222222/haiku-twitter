import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'})

//send token to backend so backend middleware can varify we are actually logged in.
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})

// export const fetchPosts = () => API.get(`/posts`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const getPost = (id) => API.get(`/posts/${id}/getPost`);
export const commentPost = (value, commentorIconImg, id) =>  API.post(`/posts/${id}/commentPost`, { value, commentorIconImg }); 
  

export const deleteComment = (id, commentId) => API.patch(`/posts/post/${id}/commentDelete`, {commentId});
export const editComment = (id, commentId) => API.patch(`/posts/post/${id}/commentEdit`, commentId);
export const getUserPosts = (creator, page) => API.get(`/posts/${creator}?page=${page}`)

export const logIn = (formData) => API.post('/user/login', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

// export const getProfile = (userId) => API.get(`/profile/${userId}`)
export const getProfile = () => API.get(`/profile`)
// export const createProfile = (profileData, userId) => API.post(`/profile/${userId}`, profileData)
export const createProfile = (profileData) => API.post(`/profile`, profileData)
export const updateProfile = (id, profileData) => API.patch(`/profile/${id}/updateProfile`, profileData)

//creator action
export const getCreatorProfile = (creator) => API.get(`/profile/${creator}`);
export const updateCreatorFollowStatus = (creator) => API.patch(`/profile/${creator}/followed`)

//targetcreator action
export const updateTargetCreatorFollowStatus = (targetCreator) => API.patch(`/profile/${targetCreator}/followedTargetCreator`)

export const followOrUnfollowCreator = (creator) => API.patch(`/profile/${creator}/follow`)