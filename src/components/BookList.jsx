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
    const [bookItems, setBookItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookItems = async () => {
            try {
                // 요청이 시작 할 때에는 error 와 bookItems 를 초기화하고
                setError(null);
                setBookItems(null);
                // loading 상태를 true 로 바꿉니다.
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
    if (!bookItems) return null;

    return (
        <div style={styles.divParent}>
            <div style={styles.div}>
                {bookItems.map((book) => (
                    <BookItem key={book.id}
                        id={book.id}
                        nickname={book.nickname}
                        title={book.title}
                        imageUrl={book.imageUrl}
                        location={book.location}
                    />
                ))}
            </div>
        </div>
    );
}

export default BookList;