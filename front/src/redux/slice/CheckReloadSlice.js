import { createSlice } from "@reduxjs/toolkit";

export const CheckReloadSlice = createSlice({
  name: "CheckReloadSlice",
  initialState: {
    value: null,
  },
  reducers: {
    setChkRL: (state, action) => {
      console.log("action.payload: ", action.payload);
      console.log("before state.value: ", state.value);

      state.value = action.payload;
      console.log("state: ", state);
      console.log("after state.value: ", state.value);

      return state;
    },
  },
});

export const { setChkRL } = CheckReloadSlice.actions;

export const selectChkRL = (state) => state.chkRL.value;

export default CheckReloadSlice.reducer;
