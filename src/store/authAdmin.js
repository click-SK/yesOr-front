import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../http/baseUrl.js";
import $api from "../http/httpUser.js";

const initialState = {
  isAdmin: false,
  user: {},
  status: "loading",
}

export const login = createAsyncThunk('admin-auth/login', async (payload, thunkAPI) => {
    try {
      const { email, password } = payload;
      const response = await $api.post('/login-admin',{email, password});
      if(response.data.message == ('Password not found' || 'User not found')) {
        return {message: 'Login error'};
      }
      thunkAPI.dispatch(authAdminSlice.actions.setAuth(true));
      return response.data;
    } catch (e) {
      console.log(e);
    }
  });

  export const checkAuthAdmin = createAsyncThunk('admin-auth/checkAuth ', async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/refresh-admin`,{withCredentials: true})
      console.log('response auth1',response);
      if(response.data.message == 'Validation error') {
        return thunkAPI.dispatch(authAdminSlice.actions.setAuth(false));
      }
      thunkAPI.dispatch(authAdminSlice.actions.setAuth(true));
      thunkAPI.dispatch(authAdminSlice.actions.setUser(response.data));
      if(response.data.accessToken) {
      localStorage.setItem('Y-R-A-T', response.data.accessToken);
      }
      return response.data;
    } catch (e) {
      console.log(e);
    }
  });
  export const logout = createAsyncThunk('admin-auth/logout ', async (payload, thunkAPI) => {
    try {
      const response = await $api.post('/logout-admin');
      console.log('payload.accessToken',payload.accessToken);
      localStorage.removeItem('Y-R-A-T',payload.accessToken)
    } catch (e) {
      console.log(e);
    }
  });

const authAdminSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
      setAuth(state, action) {
        state.isAdmin = action.payload;
      },
      setUser(state, action) {
        state.user = action.payload;
      },
    },
    extraReducers: {
      [login.pending]: (state) => {
        state.status = "loading";
        state.user = {};
      },
      [login.fulfilled]: (state, action) => {
        state.status = "loaded";
        state.user = action.payload;
      },
      [login.rejected]: (state) => {
        state.status = "error";
        state.user = {};
      },
      [logout.pending]: (state) => {
        state.status = "loading";
        state.isAdmin = false;
        state.user = {};
      },
      [logout.fulfilled]: (state, action) => {
        state.status = "loaded";
        state.isAdmin = false;
        state.user = action.payload;
      },
      [logout.rejected]: (state) => {
        state.status = "error";
        state.isAdmin = false;
        state.user = {};
      },
    },
  });

  export const authAdminReducer = authAdminSlice.reducer;