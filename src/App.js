import './App.css';
import Main from "./pages/Main";
import {Route, Routes} from "react-router-dom";
import BookDetail from "./pages/BookDetail";
import React from "react";
import BookList from "./components/BookList";
import BookSearch from "./pages/BookSearch";
import BookRegister from "./pages/BookRegister";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/books/" element={<BookList/>}/>}/>
                <Route path="/books/detail" element={<BookDetail/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/books/search" element={<BookSearch/>}/>
                <Route path="/books/register" element={<BookRegister/>}/>
            </Routes>
        </div>
    );
}

export default App;
