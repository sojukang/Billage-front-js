import Input from "../components/common/Input";
import Button from "../components/common/Button";
import React, {useState} from "react";
import {getNaverBookSearch} from "../BookApi";
import SearchBookItem from "../components/SearchBookItem";

const styles = {
    div: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: "30px",
        marginLeft:"auto",
        marginRight:"auto",
        marginBottom: "auto",
    },
    divParent: {
        display: "table",
        marginLeft: "auto",
        marginRight: "auto"
    },

    bookItems: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    button: {
        backgroundColor: 'gray'
    },

    input: {
        width: "30em",
    }
}

function BookSearch() {
    const [searchTitle, setSearchTitle] = useState("");
    const [bookItems, setBookItems] = useState([]);

    const onChangeSearchTitle = (e) => {
        setSearchTitle(e.target.value);
    }

    const fetchSearchBooks = async () => {
        const data = await getNaverBookSearch(searchTitle);
        setBookItems(data.items);
    }

    return (
        <div style={styles.divParent}>
            <div style={styles.div}>
                <Input
                    style={styles.input}
                    onChange={onChangeSearchTitle}
                >책 이름</Input>
                <Button
                    onClick={fetchSearchBooks}
                    style={styles.button}>
                    검색</Button>
            </div>
            <div style={styles.bookItems}>
            {bookItems.map((book) => (
                <SearchBookItem imageUrl={book.image} title={book.title}/>
            ))}
            </div>
        </div>
    )
}

export default BookSearch;