import Header from "../components/Header";
import React from "react";
import BookList from "../components/BookList";


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
                <BookList/>
            </div>
        </div>
    )
}

export default Main;