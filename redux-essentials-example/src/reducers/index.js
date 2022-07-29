import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "../features/counter/counterSlice";

const persistConfig = {
    key: "root",
    // localStorage에 저장합니다.
    storage,
    // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
    whitelist: ["auth"],
    // blacklist -> 그것만 제외합니다
};

export const rootReducer = combineReducers({ counterReducer });

export default persistReducer(persistConfig, rootReducer);
