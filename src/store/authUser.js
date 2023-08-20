import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../http/baseUrl.js";
import $api from "../http/httpUser.js";

const initialState = {
  isAuthUser: false,
  user: {},
  status: "loading",
}

export const login = createAsyncThunk('user-auth/login', async (payload, thunkAPI) => {
    try {
      const { email, password } = payload;
      const response = await $api.post('/login-user',{email, password});
      console.log('redux response',response);
      if(response.data.message == 'User not found' || response.data.message == 'Password not found') {
        return {message: 'Wrong email or password'};
      }
      if(response.data.message == 'User blocked') {
        return {message: 'Your was blocked'};
      }
      console.log('error work');
      thunkAPI.dispatch(authUserSlice.actions.setAuth(true));
      thunkAPI.dispatch(authUserSlice.actions.setUser(response.data));
      return response.data;
    } catch (e) {
      console.log(e);
    }
  });
export const registration = createAsyncThunk('user-auth/registration', async (payload, thunkAPI) => {
    try {
      const { email, password, firstName, lastName, phone, socialNetwork } = payload;
      const response = await $api.post('/register-user',{email, password, firstName, lastName, phone, socialNetwork, passport: '', requisites: ''});
      if(response.data.message == 'Email already exists') {
        return {message: response.data.message};
      }
      thunkAPI.dispatch(authUserSlice.actions.setAuth(true));
      thunkAPI.dispatch(authUserSlice.actions.setUser(response.data));
      return response.data;
    } catch (e) {
      console.log(e);
    }
  });

  export const checkAuthUser = createAsyncThunk('user-auth/checkAuth ', async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/refresh-user`,{withCredentials: true})
      // console.log('response auth1',response);
      if(response.data.message == 'Validation error') {
        return thunkAPI.dispatch(authUserSlice.actions.setAuth(false));
      }
      thunkAPI.dispatch(authUserSlice.actions.setAuth(true));
      thunkAPI.dispatch(authUserSlice.actions.setUser(response.data));
      if(response.data.accessToken) {
      localStorage.setItem('Y-R-U-T', response.data.accessToken);
      }
      return response.data;
    } catch (e) {
      console.log(e);
    }
  });
  export const logout = createAsyncThunk('user-auth/logout ', async (payload, thunkAPI) => {
    try {
      const response = await $api.post('/logout-user');
      console.log('payload.accessToken',payload.accessToken);
      localStorage.removeItem('Y-R-U-T',payload.accessToken)
    } catch (e) {
      console.log(e);
    }
  });

const authUserSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
      setAuth(state, action) {
        state.isAuthUser = action.payload;
      },
      setUser(state, action) {
        state.user = action.payload;
      },
    },
    extraReducers: {
      [logout.pending]: (state) => {
        state.status = "loading";
        state.isAuthUser = false;
        state.user = {};
      },
      [logout.fulfilled]: (state, action) => {
        state.status = "loaded";
        state.isAuthUser = false;
        state.user = action.payload;
      },
      [logout.rejected]: (state) => {
        state.status = "error";
        state.isAuthUser = false;
        state.user = {};
      },
    },
  });

  export const authUserReducer = authUserSlice.reducer;