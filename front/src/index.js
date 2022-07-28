import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App.js";

//react Redux 사용 위함
import store from "./app/store.js";
import { Provider } from "react-redux";

//MUI font

ReactDOM.render(
    //react 컴포넌트에서 store을 사용할 수 있게 Provider 생성
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
