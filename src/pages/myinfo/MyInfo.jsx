import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getBooksByUser, getLentBooksByUser, getRequestBooksByUser} from "../../BookApi";
import styled from "styled-components";
import LentBookAsOwner, {MyInfoButton} from "./LentBookAsOwner";
import PendingBook from "./PendingBook";
import AvailableBook from "./AvailableBook";
import Header from "../../components/Header";
import LentBook from "./LentBook";
import {Button, withStyles} from "@material-ui/core";

export const CategoryBox = styled.main`
  justify-content: center;
  align-items: center;

  width: 100%;
  margin: 0.3em auto 1em auto;
  padding-top: 2rem;
  border-top: 1px solid #dddddd;
`;

export const CategoryName = styled.div`
  width: 24rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #efd7d7;
  font-weight: bold;
  border-radius: 8px;
`;

export const NoContentMessage = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const GoBooksAsClientButton = withStyles({
    root: {
        width: "7rem",
        height: "2rem",
        display: "inline-block",
        marginTop: "1em",
        marginLeft: "2.5em",
        marginRight: "2.5em",
        backgroundColor: "#959595",
        color: "#494848",
        fontWeight: "bold"
    },
})(Button);

function MyInfo() {
    const user = useSelector(state => state);
    const [bookItems, setBookItems] = useState(null);
    const [lentBookItems, setLentBookItems] = useState(null);

    useEffect(() => {
        getBooks(user.token);
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

    return (
        <>
            <Header/>
            <CategoryBox>
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

