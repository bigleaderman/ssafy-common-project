import { createSlice } from "@reduxjs/toolkit";

export const RandomUserSlice = createSlice({
  name: "randomUser",
  initialState: {
    randomUserF: []
  },
  reducers: {
    randomUser: (state, action) => {
        console.log('랜덤매칭후 유저 정보',action.payload)
        return action.payload
    }
    
  },
});

export const { randomUser } = RandomUserSlice.actions;

export const selectRandomUser = state => state.randomUser;

export default RandomUserSlice.reducer;