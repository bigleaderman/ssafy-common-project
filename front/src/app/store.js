import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import counterReducer from "../components/example/counterSlice";
=======
import counterReducer from "../components/example/counterSlice.js";
>>>>>>> 12cc2f7d2be64eef9fea24423475bd2009c5af06

export default configureStore({
    reducer: {
        counter: counterReducer,
    },
});
