import { createSlice } from "@reduxjs/toolkit";

const savedUser=JSON.parse(localStorage.getItem("user"));

const initialState = {
 user:savedUser || null,
 token:savedUser?.token || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.user=action.payload;
      state.token=action.payload.token;
      localStorage.setItem("user",JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user=null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
