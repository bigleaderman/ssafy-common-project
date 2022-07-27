import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import SignOutPage from "./pages/SignOutPage";
import RoomPage from "./pages/RoomPage";
import MyPage from "./pages/MyPage";
import UserListPage from "./pages/UserListPage";
import Header from "./components/Header";

import React from "react";
import logo from "./logo.svg";
import { Counter } from "./components/example/Counter";
import "./App.css";
import "./color.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route exact path="/signin" element={<SignInPage />} />
          <Route exact path="/signout" element={<SignOutPage />} />
          <Route exact path="/mypage" element={<MyPage />} />
          <Route exact path="/userlist" element={<UserListPage />} />
          <Route exact path="/roompage" element={<RoomPage />} />
        </Routes>
      </Router>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
