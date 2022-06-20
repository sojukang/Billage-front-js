import './App.css';
import Main from "./pages/Main";
import {Route, Routes} from "react-router-dom";
import BookDetail from "./pages/BookDetail";
import React from "react";
import BookList from "./components/BookList";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/books/" element={<BookList />} />}/>
                <Route path="/books/detail" element={<BookDetail />}/>
            </Routes>
        </div>
    );
}

export default App;
