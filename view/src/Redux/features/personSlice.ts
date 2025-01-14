import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import User from "../../models/User";
import { stat } from "fs";
import LogInUser from "../../models/LogInUser";

const BASE_URL = "http://localhost:5000";

interface PersonState {
  user: User
  loading: boolean;
  error: string | null;
}

const initialState: PersonState = {
  user: {
    id: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    userRole: 0,
  },
  loading: false,
  error: null
}

//users

export const logIn = createAsyncThunk("users/login", async (user:LogInUser,{ rejectWithValue }) => {
  try {
    console.log("I in login redux");
    // console.log(user);
    const response = await axios.post(`${BASE_URL}/users/log-in`, user, {
      withCredentials: true
  });
  console.log("response.data:",response.data);
    return response.data
  } catch (err) {
    return rejectWithValue("הנתונים שהזנת שגויים");
  }
});

export const createUser = createAsyncThunk("users/create", async (user: User,{ rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, user, { withCredentials: true });
    console.log("res.data.redux",response.data)
    return response.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue("הנתונים שהזנת שגויים");
  }
});


export const PersonSlice = createSlice({
  name: "PersonSlice",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = (action.payload);
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.user = (action.payload)
      state.loading = false; // Set loading to false once the request is done
      state.error = null; // Clear any previous errors
    })
    .addCase(logIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string; // Set the error from rejectWithValue
    })
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.user = (action.payload)
      state.loading = false; // Set loading to false once the request is done
      state.error = null; // Clear any previous errors
    })
  }
})

export default PersonSlice.reducer;
export const { addUser } = PersonSlice.actions;


