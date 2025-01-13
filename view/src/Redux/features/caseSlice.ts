import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const BASE_URL = "http://localhost:5000";

interface CaseState  {
    cases: any[]
    }

  const initialState:CaseState = {
    cases:[]
  }
  export const getCases = createAsyncThunk ("cases/get",async(asyncThunk)=>{
    try {
      const response = await axios.get(`${BASE_URL}/cases/FullCases`,{ withCredentials: true });
      return response.data
    } catch (err) {
      console.log(err);
    }  
  });
  export const createCase = createAsyncThunk ("cases/create",async(Case:any,asyncThunk)=>{
    try {
      const response = await axios.post(`${BASE_URL}/cases`, Case);
      return response.data
    } catch (err) {
      console.log(err);
    }  
  });

  export const CaseSlice = createSlice({
    name: "CaseSlice",
    initialState:initialState,
    reducers:{
       addCase:(state,action)=>{
           state.cases.push(action.payload);
         },
      },
      extraReducers:(builder)=>{
        builder.addCase(getCases.fulfilled,(state,action)=>{
        state.cases = action.payload
      })
      builder.addCase(createCase.fulfilled,(state,action)=>{
        state.cases.push(action.payload)
      })
    }
})

export default CaseSlice.reducer;
export const {addCase} = CaseSlice.actions;

