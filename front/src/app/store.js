import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../components/example/counterSlice.js";

export default configureStore({
    reducer: {
        counter: counterReducer,
    },
});
