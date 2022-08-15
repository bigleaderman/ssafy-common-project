import { createSlice } from "@reduxjs/toolkit";

export const FriendListSlice = createSlice({
  name: "friendList",
  initialState: {
    friendList: []
  },
  reducers: {
    friendList: (state, action) => {
        return action.payload
    }
    
  },
});

export const { friendList } = FriendListSlice.actions;

export const selectFriendList = state => state.friendList;

export default FriendListSlice.reducer;