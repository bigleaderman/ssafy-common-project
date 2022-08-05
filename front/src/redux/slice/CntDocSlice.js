import { createSlice } from "@reduxjs/toolkit";

export const CntDocSlice = createSlice({
    name: "CntDocSlice",
    initialState: {
        value: 1,
    },
    reducers: {
        setDoc: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setDoc } = CntDocSlice.actions;

export const selectCntDoc = (state) => state.cntDoc.value;

//equeal
// export const selectCount = function (state) {
//     return state.counter.value;
// };

export default CntDocSlice.reducer;
