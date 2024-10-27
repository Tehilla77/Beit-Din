import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const BASE_URL = "http://localhost:5000";

interface DiscussionState  {
    discussions:any[]
    }

  const initialState:DiscussionState = {
    discussions:[]
  }
  export const getDiscussions = createAsyncThunk ("discussions/get",async(asyncThunk)=>{
    try {
      const response = await axios.get(`${BASE_URL}/discussion`);
      return response.data
    } catch (err) {
      console.log(err);
    }  
  });
  export const createDiscussion = createAsyncThunk ("discussions/create",async(Discussion:any,asyncThunk)=>{
    try {
      const response = await axios.post(`${BASE_URL}/discussions`, Discussion);
      return response.data
    } catch (err) {
      console.log(err);
    }  
  });

  export const DiscussionSlice = createSlice({
    name: "discussionSlice",
    initialState:initialState,
    reducers:{
       addDiscussion:(state,action)=>{
           state.discussions.push(action.payload);
         },
      },
      extraReducers:(builder)=>{
        builder.addCase(getDiscussions.fulfilled,(state,action)=>{
        state.discussions = action.payload
      })
      builder.addCase(createDiscussion.fulfilled,(state,action)=>{
        state.discussions.push(action.payload)
      })
    }
})

export default DiscussionSlice.reducer;
export const {addDiscussion} = DiscussionSlice.actions;

