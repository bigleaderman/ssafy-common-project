import { createSlice } from "@reduxjs/toolkit";

export const CntCivilSlice = createSlice({
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

export const { setCivil } = CntCivilSlice.actions;

export const selectCntCivil = (state) => state.cntCivil.value;

export default CntCivilSlice.reducer;
