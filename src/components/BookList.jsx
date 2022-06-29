import React, {useEffect, useState} from 'react';
import BookItem from "./BookItem";
import {getBooks} from "../BookApi";

const styles = {
    div: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },

    divParent: {
        display: "center"
    }
}

function BookList() {
    const [bookItems, setBookItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);




    function compareStatus(a, b) {
        if ((a.status === "UNAVAILABLE" && b.status !== "UNAVAILABLE") ||
            (a.status === "PENDING" && b.status === "AVAILABLE")) {
            return 1;
        }
        if (a.status === b.status) {
            return 0;
        }
        return -1;
    }

    function compareId(a, b) {
        return b.id - a.id;
    }

    useEffect(() => {
        const fetchBookItems = async () => {
            try {
                setError(null);
                setBookItems(null);
                setLoading(true);

                const response = await getBooks();
                setBookItems(response)
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchBookItems();
    }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (bookItems.length === 0) return null;

    return (
        <div style={styles.divParent}>
            <div style={styles.div}>
                {bookItems.sort(compareId).sort(compareStatus).map((book) => (
                    <BookItem key={book.id}
                              id={book.id}
                              nickname={book.nickname}
                              title={book.title}
                              imageUrl={book.imageUrl}
                              detailMessage={book.detailMessage}
                              status={book.status}
                              location={book.location}
                    />
                ))}
            </div>
        </div>
    );
}

export default BookList;