import './App.css';
import Main from "./pages/Main";
import {Route, Routes} from "react-router-dom";
import BookDetail from "./pages/BookDetail";
import React from "react";
import BookList from "./components/BookList";
import BookSearch from "./pages/BookSearch";
import BookRegister from "./pages/BookRegister";
import Login from "./pages/login/Login";
import MyInfo from "./pages/myinfo/MyInfo";
import BookUpdate from "./pages/update/BookUpdate";
import LentBookListAsClient from "./pages/myinfo/LentBookListAsClient";
import LoginGithub from "./pages/login/LoginGithub";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/books/" element={<BookList/>}/>}/>
                <Route path="/books/detail" element={<BookDetail/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/login/oauth" element={<LoginGithub/>}/>
                <Route path="/me" element={<MyInfo/>}/>
                <Route path="/me/client" element={<LentBookListAsClient/>}/>
                <Route path="/books/me/*" element={<BookUpdate/>}/>
                <Route path="/books/search" element={<BookSearch/>}/>
                <Route path="/books/register" element={<BookRegister/>}/>
            </Routes>
        </div>
    );
}

export default App;
