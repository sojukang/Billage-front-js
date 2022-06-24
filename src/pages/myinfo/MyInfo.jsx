import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getBooksByUser} from "../../BookApi";
import styled from "styled-components";
import MyInfoBookContainer from "./MyInfoBookContainer";
import PendingBook from "./PendingBook";
import AvailableBook from "./AvailableBook";
import Header from "../../components/Header";

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

    useEffect(() => {
        getBooks(user.token);
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

    const availables = [];
    const pendings = [];
    const unavailables = [];

    if (bookItems) {
        for (const key in bookItems) {
            if (bookItems[key].status === "AVAILABLE") {
                availables.push(bookItems[key]);
            }
            if (bookItems[key].status === "PENDING") {
                pendings.push(bookItems[key])
            } else if (bookItems[key].status === "UNAVAILABLE")
                unavailables.push(bookItems[key])
        }

        console.log(`빌림 가능: ${availables}`)
        console.log(`빌림 대기중: ${pendings}`)
        console.log(`빌림 불가: ${unavailables}`)
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
                            <MyInfoBookContainer
                                key={book.id}
                                id={book.id}
                                title={book.title}
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

