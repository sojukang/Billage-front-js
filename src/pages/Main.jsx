import Header from "../components/Header";
import BookItem from "../components/BookItem";
import React from "react";

const books = [
    {
        test: 1
    },
    {
        test: 2
    },
    {
        test: 3
    },
    {
        test: 4
    }
]

const styles = {
    div: {
        display: "flex",
        justifyContent: "space-between"
    }
}

function Main() {
    return (
        <div>
            <Header name={""}/>
            <div style={styles.div}>
            {books.map((book) => (
                <BookItem key={book.test}/>
            ))}
            </div>
        </div>
    )
}

export default Main;