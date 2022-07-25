import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../ccomponents/counterSlice.js";

export default configureStore({
    reducer: {
        counter: counterReducer,
    },
});
