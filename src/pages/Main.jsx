import Header from "../components/Header";
import React from "react";
import BookList from "../components/BookList";
import {ContentsBox} from "./ContentsBox";


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
            <ContentsBox>
                <div style={styles.div}>
                    <BookList/>
                </div>
            </ContentsBox>
        </div>
    )
}

export default Main;