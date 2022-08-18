import { createSlice } from "@reduxjs/toolkit";

export const GameDataSlice = createSlice({
  name: "CntCivilSlice",
  initialState: {
    value: 2,
  },
  reducers: {
    setCivil: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCivil } = GameDataSlice.actions;

export const selectCntCivil = (state) => state.cntCivil;

export default GameDataSlice.reducer;
