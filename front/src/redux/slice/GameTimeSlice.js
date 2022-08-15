import { createSlice } from "@reduxjs/toolkit";

export const GameTimeSlice = createSlice({
  name: "GameTime",
  initialState: {
    talkTime: 60,
    voteTime: 60,
    nightTime: 30,
  },
  reducers: {
    setTalkTime: (state, action) => {
      state.talkTime = action.payload;
    },
    setVoteTime: (state, action) => {
      state.voteTime = action.payload;
    },
    setNightTime: (state, action) => {
      state.nightTime = action.payload;
    },
  },
});

export const selectTalkTime = (state) => state.gameTime.talkTime;
export const selectVoteTime = (state) => state.gameTime.voteTime;
export const selectNightTime = (state) => state.gameTime.nightTime;

export const { setTalkTime, setVoteTime, setNightTime } = GameTimeSlice.actions;

export default GameTimeSlice.reducer;
