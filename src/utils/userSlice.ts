import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: null,
    userName: null,
    userEmail: null,
    photoUrl: null,
  },

  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return {
        uid: null,
        userName: null,
        userEmail: null,
        photoUrl: null,
      };
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
