import { createSlice } from "@reduxjs/toolkit";

//슬라이스를 생성하려면 슬라이스를 식별하기 위한
//문자열 이름, 초기 상태 값, 상태 업데이트 방법을 정의하는 하나 이상의 리듀서 함수가 필요합니다.
//슬라이스가 생성되면 생성된 Redux 액션 생성자와
//전체 슬라이스에 대한 리듀서 기능을 내보낼 수 있습니다.

//Redux는 데이터 복사본을 만들고 복사본을 업데이트하여
//모든 상태 업데이트를 변경 불가능하게 작성하도록 요구합니다.
//그러나 Redux Toolkit의 createSlice 및 createReducer API는 Immer 내부를 사용하여
//올바른 변경 불가능한 업데이트가 되는 "변경" 업데이트 로직을 작성할 수 있도록 합니다.
export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },

        decrement: (state) => {
            state.value -= 1;
        },

        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount));
    }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
