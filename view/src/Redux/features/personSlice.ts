import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import User from "../../models/User";

const BASE_URL = "http://localhost:5000";

interface PersonState  {
    persons: User[]
    }

  const initialState:PersonState = {
    persons:[]
  }

  export const getUsers = createAsyncThunk ("users/get",async()=>{
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      return response.data
    } catch (err) {
      console.log(err);
    }  
  });
  export const createUser = createAsyncThunk("users/create", async (user: User) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, user, { withCredentials: true });
      return response.data;
    } catch (err) {
      console.log(err);
    }  
  });
  
  

  export const PersonSlice = createSlice({
    name: "PersonSlice",
    initialState:initialState,
    reducers:{
       addPerson:(state,action)=>{
           state.persons.push(action.payload);
         },
      },
      extraReducers:(builder)=>{
        builder.addCase(getUsers.fulfilled,(state,action)=>{
        state.persons = action.payload
      })
      builder.addCase(createUser.fulfilled,(state,action)=>{
        state.persons.push(action.payload)
      })
    }
})

export default PersonSlice.reducer;
export const {addPerson} = PersonSlice.actions;