import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: null,
    loading: false,
  },
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    loadingDone: (state) => {
      state.loading = false;
    },
    loginSuccess: (state, action) => {
      state.auth = action.payload;
    },
    refreshSuccess: (state, action) => {
      state.auth.tokens = action.payload;
    },
    calculateScore: (state, action) => {
      const totalTrue = action.payloa.filter((item) => item.result === true);
      state.auth.user.score = totalTrue.length;
    },
    logoutSuccess: (state) => {
      state.auth = null;
    },
  },
});

export const { loading, loadingDone, loginSuccess, refreshSuccess, logoutSuccess, calculateScore } =
  authSlice.actions;

export default authSlice.reducer;
