import { createSlice } from "@reduxjs/toolkit";

export const CntConSlice = createSlice({
  name: "CntConSlice",
  initialState: {
    value: 0,
  },
  reducers: {
    setCon: (state, action) => {
      state.value = action.payload;
    },
    increCon: (state) => {
      state.value++;
    },
    decreCon: (state) => {
      state.value--;
    },
  },
});

export const { increCon, decreCon, setCon } = CntConSlice.actions;

export const selectCntCon = (state) => state.cntCon.value;

export default CntConSlice.reducer;
