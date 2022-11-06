import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";


export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const { data } = await axios.get('/posts')
    return data
})




export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
     const { data } = await axios.get('/tags')
    return data
})

export const fetchRemovePost = createAsyncThunk("posts/fetchRemovePost", async (id) => {
      axios.delete(`/posts/${id}`)
    
})

export const fetchComments = createAsyncThunk("posts/fetchComments", async (id) => {
    const { data } = await axios.get(`/comment/${id}`)
    return data
})


const initialState = {
    posts: {
        items: [],
        status:'loading'
    },
    tags: {
        items: [],
        status:'loading'
    },
    comments: {
        items: [],
        status:"loading"
    }
    
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.status = 'loaded';
            state.posts.items = action.payload;
        },
          [fetchPosts.rejected]: (state) => {
            state.posts.status = 'error';
            state.posts.items = [];
        },
           [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading'
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.status = 'loaded';
            state.tags.items = action.payload;
        },
          [fetchTags.rejected]: (state) => {
            state.tags.status = 'error';
            state.tags.items = [];
        },
           [fetchRemovePost.fulfilled]: (state, action) => {
            state.posts.items = state.posts.items.filter(post=>post._id!==action.meta.arg)
           
        },
         [fetchComments.pending]: (state) => {
            state.comments.items = [];
            state.comments.status = 'loading'
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.comments.status = 'loaded';
            state.comments.items = action.payload;
        },
          [fetchComments.rejected]: (state) => {
            state.comments.status = 'error';
            state.comments.items = [];
        },
          
           
        // [fetchRemovePost.fulfilled]: (state, action) => {
        //     state.posts.status = 'loaded';
        //     state.posts.items = action.payload;
        // },
        //   [fetchRemovePost.rejected]: (state) => {
        //     state.posts.status = 'error';
        //     state.posts.items = [];
        // },
    
    }
})

export const postsReducer = postsSlice.reducer; 