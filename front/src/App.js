import { BrowserRouter as Router, Routes, Route } from  "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import SignOutPage from "./pages/SignOutPage";
import MyPage from "./pages/MyPage";
import UserListPage from "./pages/UserListPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VideoRoomPage from "./pages/VideoRoomPage";
import GameRoomPage from "./pages/GameRoomPage";

import React from "react";
import logo from "./logo.svg";
import { Counter } from "./ccomponents/Counter";
import "./App.css";
import './color.css';


function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route exact path="/" element={<GameRoomPage />} />  {/* 테스트 위해 MainPage 대신 VideoRoomPage로 연결 */}
                    <Route exact path="/signup" element={<SignUpPage />} />
                    <Route exact path="/signin" element={<SignInPage />} />
                    <Route exact path="/signout" element={<SignOutPage />} />
                    <Route exact path="/mypage" element={<MyPage />} />
                    <Route exact path="/userlist" element={<UserListPage />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
