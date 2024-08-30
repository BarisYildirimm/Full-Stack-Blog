import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "User",
  initialState: initialState,
  signInStart: (state) => {
    state.loading = true;
    state.error = null;
  },
  signInSuccess: (state, action) => {
    state.currentUser = action.payload;
    state.laoding = false;
    state.error = null;
  },
  signFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

export const { signInStart, signInSuccess, signFailure } = userSlice.actions;

export default userSlice.reducer;
