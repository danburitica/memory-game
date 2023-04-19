import { createSlice } from "@reduxjs/toolkit";

const username = localStorage.getItem("username");
const initialState = {
  name: username || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
      localStorage.setItem("username", action.payload);
    },
  },
});

export const { setName } = userSlice.actions;

export default userSlice.reducer;
