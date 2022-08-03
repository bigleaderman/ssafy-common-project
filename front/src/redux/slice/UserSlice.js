import { createSlice } from "@reduxjs/toolkit";


export const UserSlice = createSlice({
    name: "user",
    initialState: {
        accessToken: null,
        refreshToken: null,
    },
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            return state;
        },
        logout: (state) => {
            state = {};
            return state;
        },
        getUser: (state, action) => {
            state.auth = action.payload.auth;
            state.authority = action.payload.authority;
            state.email = action.payload.email;
            state.loseCount = action.payload.loseCount;
            state.nickname = action.payload.nickname;
            state.rankPoint = action.payload.rankPoint;
            state.redUser = action.payload.redUser;
            state.userSeq = action.payload.userSeq;
            state.winCount = action.payload.winCount;
            return state;
        },
    },
});

export const { login, logout, getUser } = UserSlice.actions;

export const selectUser = (state) => state.user;

export default UserSlice.reducer;
