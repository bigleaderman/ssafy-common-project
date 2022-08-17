import { createSlice } from "@reduxjs/toolkit";

export const CharSlice = createSlice({
  name: "CharSlice",
  initialState: {
    x: 350,
    y: 600,
    color: undefined,
    isHost: false,
    character : "",
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
    setChar:(state, action) =>{
      state.character = action.payload;
    }
  },
});

export const { setX, setY, setColor,setChar } = CharSlice.actions;

export const selectY = (state) => state.char.y;
export const selectX = (state) => state.char.x;
export const selectColor = (state) => state.char.color;
export const selectHost = (state) => state.char.isHost;
export const selecCharacter = (state) => state.char.character;

export default CharSlice.reducer;
