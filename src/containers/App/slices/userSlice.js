import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: localStorage.getItem("username") || "",
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
