import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


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
            axios({
                method: 'get',
                url: '/api/user/me',
                headers: {
                    Authorization: `Bearer ` + state.accessToken,
                }
            })
            .then((response) => {
                state = {
                    ...response.data,
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                };
                return state;
            })
        },
        logout: (state) => {
            state = {
                accessToken: null,
                refreshToken: null,
            }
            return state;
        }
    },
});

export const { login, logout } = UserSlice.actions;

export const selectUser = (state) => state.user;

export default UserSlice.reducer;
