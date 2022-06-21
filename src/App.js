import './App.css';
import Main from "./pages/Main";
import {Route, Routes} from "react-router-dom";
import BookDetail from "./pages/BookDetail";
import React from "react";
import BookList from "./components/BookList";
import BookSearch from "./pages/BookSearch";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/books/" element={<BookList />} />}/>
                <Route path="/books/detail" element={<BookDetail />}/>
                <Route path="/books/search" element={<BookSearch />}/>
            </Routes>
        </div>
    );
}

export default App;
