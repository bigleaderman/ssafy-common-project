//combineReducers = reducer가 여러 개일 때 하나로 묶어줌
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import GatherConCntReducer from "../slice/GatherConCntSlice";
import GatherNameSlice from "../slice/GatherNameSlice";
import UserSlice from "../slice/UserSlice";
//redux-persist 관련 함수
import { persistReducer, persistStore } from "redux-persist";
//thunk = 실행을 지연시켜줌
import thunk from "redux-thunk";
//storageSession = 세션스토리지에 저장
import storage from "redux-persist/lib/storage/session";
//persist 설정
const persistConfig = {
    key: "root",
    storage,
    debug: true,
};

//rootReducer = 조합된 최종 리듀서
const rootReducer = combineReducers({
    conCnt: GatherConCntReducer,
    gatherName: GatherNameSlice,
    user: UserSlice,
});

//persistReducer(설정, 최종 리듀서)
const persistedReducer = persistReducer(persistConfig, rootReducer);

//store에 유지되는 리듀서 함수를 넣어줌
//middleware의 역할 : 리듀서에 도달하기 전에 직렬화할 수 없는 값을 가로채서 중지함
//thunk 미들웨어를 사용하지 않고 Redux Persist를 사용하면 브라우저 콘솔에서 직렬화
//할 수 없는 값이 상태에서 감지되었음을 읽는 오류가 발생
export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

//index.js에 사용함
export const persistor = persistStore(store);
