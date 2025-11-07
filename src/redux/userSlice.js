import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: null,
    email: null,
    role: null,
    token: null,
    isLogin: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isLogin = true;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
