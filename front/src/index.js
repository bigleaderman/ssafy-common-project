import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App.js";

//react Redux 사용 위함
import { store, persistor } from "./redux/store/store.js";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

<<<<<<< HEAD
//redux-persist 관련 함수
import { PersistGate } from "redux-persist/integration/react";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
=======
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //react 컴포넌트에서 store을 사용할 수 있게 Provider 생성
    <Provider store={store}>
        <App />
    </Provider>,
>>>>>>> 12cc2f7d2be64eef9fea24423475bd2009c5af06
);

reportWebVitals();
