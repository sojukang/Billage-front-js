import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getRequestBooksByUser} from "../../BookApi";
import Header from "../../components/Header";
import LentBook from "./LentBook";
import {CategoryBox, CategoryName, NoContentMessage} from "./MyInfo";

function LentBookListAsClient() {
    const user = useSelector(state => state);
    const [BookAsClientItems, setBookAsClientItems] = useState(null);

    useEffect(() => {
        getClientRequest(user.token);
    }, [user])

    function getClientRequest(token) {
        if (!token) {
            return
        }
        getRequestBooksByUser(token)
            .then((response) => {
                setBookAsClientItems(response)
            }).catch((error) => {
            console.log(error.response.data.message)
        })
    }

    const requests = [];
    const lentBooks = [];

    if (BookAsClientItems) {
        for (const key in BookAsClientItems) {
            if (BookAsClientItems[key].status === "REQUEST") {
                requests.push(BookAsClientItems[key]);
            } else if (BookAsClientItems[key].status === "LENT") {
                lentBooks.push(BookAsClientItems[key])
            }
        }
    }

    return (
        <>
            <Header/>
            <CategoryBox>
                <div align="center">
                    <CategoryName>빌림 요청한 책👉</CategoryName>
                    {requests.length > 0 ? requests.map((book) => (
                            <LentBook
                                key={book.id}
                                id={book.id}
                                nickname={book.ownerNickname}
                                title={book.title}
                                detailMessage={book.detailMessage}
                                lentMessage={book.requestMessage}
                                status={book.status}
                                imageUrl={book.imageUrl}
                                location={book.location}
                            />
                        )) :
                        <NoContentMessage>빌림 요청 한 책이 없어요😭</NoContentMessage>
                    }
                </div>
                <div align="center">
                    <CategoryName>빌린 책👍</CategoryName>
                    {lentBooks.length > 0 ? lentBooks.map((book) => (
                            <LentBook
                                key={book.id}
                                id={book.id}
                                title={book.title}
                                nickname={book.ownerNickname}
                                detailMessage={book.detailMessage}
                                status={book.status}
                                lentMessage={book.requestMessage}
                                imageUrl={book.imageUrl}
                                location={book.location}
                            />
                        )) :
                        <NoContentMessage>아직 빌린 책이 없어요😭</NoContentMessage>
                    }
                </div>
            </CategoryBox>
        </>
    )
}

export default LentBookListAsClient;