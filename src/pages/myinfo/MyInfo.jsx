import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getBooksByUser, getLentBooksByUser, getRequestBooksByUser} from "../../BookApi";
import styled from "styled-components";
import LentBookAsOwner from "./LentBookAsOwner";
import PendingBook from "./PendingBook";
import AvailableBook from "./AvailableBook";
import Header from "../../components/Header";
import LentBook from "./LentBook";

export const CategoryBox = styled.main`
  justify-content: center;
  align-items: center;

  width: 100%;
  margin: 0.3em auto 1em auto;
  padding-top: 2rem;
  border-top: 1px solid #dddddd;
`;

const CategoryName = styled.div`
  width: 24rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #efd7d7;
  font-weight: bold;
  border-radius: 8px;
`;

const NoContentMessage = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

function MyInfo() {
    const user = useSelector(state => state);
    const [bookItems, setBookItems] = useState(null);
    const [lentBookItems, setLentBookItems] = useState(null);
    const [BookAsClientItems, setBookAsClientItems] = useState(null);

    useEffect(() => {
        getBooks(user.token);
        getClientRequest(user.token);
        getLentBooks(user.token);
    }, [user])

    function getBooks(token) {
        if (!token) {
            return
        }
        getBooksByUser(token)
            .then((response) => {
                setBookItems(response)
            }).catch((error) => {
            console.log(error.response.data.message)
        })
    }

    function getLentBooks(token) {
        if (!token) {
            return
        }
        getLentBooksByUser(token)
            .then((response) => {
                setLentBookItems(response)
            }).catch((error) => {
            console.log(error.response.data.message)
        })
    }

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

    let availables = [];
    const pendings = [];
    const unavailables = [];

    if (lentBookItems) {
        for (const key in lentBookItems) {
            if (lentBookItems[key].status === "REQUEST") {
                pendings.push(lentBookItems[key])
            } else if (lentBookItems[key].status === "LENT")
                unavailables.push(lentBookItems[key])
        }
    }

    if (bookItems) {
        availables = bookItems.filter(book => book.status === "AVAILABLE");
    }

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
                                nickname={book.nickname}
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
                                nickname={book.nickname}
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
                <hr/>
                <div align="center">
                    <CategoryName>빌림 요청 온 책🙏</CategoryName>
                    {pendings.length > 0 ? pendings.map((book) => (
                            <PendingBook
                                key={book.id}
                                id={book.id}
                                title={book.title}
                                lentMessage={book.requestMessage}
                                imageUrl={book.imageUrl}
                                location={book.location}
                            />
                        )) :
                        <NoContentMessage>빌림 요청 온 책이 없어요😭</NoContentMessage>
                    }
                </div>
                <div align="center">
                    <CategoryName>빌려줄 수 있는 책👌</CategoryName>
                    {availables.length > 0 ? availables.map((book) => (
                            <AvailableBook
                                key={book.id}
                                id={book.id}
                                nickname={book.nickname}
                                title={book.title}
                                detailMessage={book.detailMessage}
                                imageUrl={book.imageUrl}
                                location={book.location}
                            />
                        )) :
                        <NoContentMessage>빌려줄 수 있는 책이 없어요😭</NoContentMessage>
                    }
                </div>
                <div align="center">
                    <CategoryName>빌려준 책🤝</CategoryName>
                    {unavailables.length > 0 ? unavailables.map((book) => (
                            <LentBookAsOwner
                                key={book.id}
                                id={book.id}
                                title={book.title}
                                lentMessage={book.requestMessage}
                                detailMessage={book.detailMessage}
                                imageUrl={book.imageUrl}
                                location={book.location}
                            />
                        )) :
                        <NoContentMessage>빌려준 책이 없어요😭</NoContentMessage>
                    }
                </div>
            </CategoryBox>
        </>
    )
}

export default MyInfo;

