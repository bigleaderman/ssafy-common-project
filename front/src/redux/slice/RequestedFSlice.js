import { createSlice } from "@reduxjs/toolkit";

export const RequestedFSlice = createSlice({
  name: "requestedF",
  initialState: {
    requestedF: []
  },
  reducers: {
    requestedF: (state, action) => {
        return action.payload
    }
    
  },
});

export const { requestedF } = RequestedFSlice.actions;

export const selectRequestedF = state => state.requestedF;

export default RequestedFSlice.reducer;