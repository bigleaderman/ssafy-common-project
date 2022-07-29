import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App.js";

//react Redux 사용 위함
import { store, persistor } from "./redux/store/store.js";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

//redux-persist 관련 함수
import { PersistGate } from "redux-persist/integration/react";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);

reportWebVitals();
