import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../components/example/counterSlice";

export default configureStore({
    reducer: {
        counter: counterReducer,
    },
});
