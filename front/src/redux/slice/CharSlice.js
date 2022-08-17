import { createSlice } from "@reduxjs/toolkit";

export const CharSlice = createSlice({
  name: "CharSlice",
  initialState: {
    x: 350,
    y: 600,
    color: undefined,
    isHost: false,
  },
  reducers: {
    setX: (state, action) => {
      state.x = action.payload;
    },
    setY: (state, action) => {
      state.y = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setHost: (state, action) => {
      state.isHost = action.payload;
    },
  },
});

export const { setX, setY, setColor } = CharSlice.actions;

export const selectY = (state) => state.char.y;
export const selectX = (state) => state.char.x;
export const selectColor = (state) => state.char.color;
export const selectHost = (state) => state.char.isHost;

export default CharSlice.reducer;
