import { createSlice } from "@reduxjs/toolkit";

export const WsSlice = createSlice({
  name: "WsSlice",
  initialState: {
    client: "",
  },
  reducers: {
    setClient: (state, action) => {
      state.client = action.payload;
    },
  },
});

export const { setClient } = WsSlice.actions;

export const selectWs = (state) => state.ws.client;

export default WsSlice.reducer;
