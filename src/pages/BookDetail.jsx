import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import BookItem from "../components/BookItem";
import {getBook} from "../BookApi";

function BookDetail() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const [bookItem, setBookItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookItem = async () => {
            try {
                setError(null);
                setBookItem(null);
                setLoading(true);

                const response = await getBook(id);
                setBookItem(response)
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchBookItem();
    }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!bookItem) return null;

    return <BookItem
        id={id}
        title={bookItem.title}
        nickname={bookItem.nickname}
        imageUrl={bookItem.imageUrl}
        detailMessage={bookItem.detailMessage}
        location={bookItem.location}
    />
}

export default BookDetail;
