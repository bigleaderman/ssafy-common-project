import { createSlice } from "@reduxjs/toolkit";

export const CntMafSlice = createSlice({
    name: "CntMafSlice",
    initialState: {
        value: 2,
    },
    reducers: {
        setMaf: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setMaf } = CntMafSlice.actions;

export const selectCntMaf = (state) => state.cntMaf.value;

//equeal
// export const selectCount = function (state) {
//     return state.counter.value;
// };

export default CntMafSlice.reducer;
