import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App.js";

//react Redux를
import store from "./app/store.js";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //react 컴포넌트에서 store을 사용할 수 있게 Provider 생성
    <Provider store={store}>
        <App />
    </Provider>,
);
