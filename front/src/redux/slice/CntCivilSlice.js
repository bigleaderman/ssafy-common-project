import { createSlice } from "@reduxjs/toolkit";

export const CntCivilSlice = createSlice({
    name: "CntCivilSlice",
    initialState: {
        value: 4,
    },
    reducers: {
        setCivil: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setCivil } = CntCivilSlice.actions;

export const selectCntCivil = (state) => state.cntCivil.value;

//equeal
// export const selectCount = function (state) {
//     return state.counter.value;
// };

export default CntCivilSlice.reducer;
