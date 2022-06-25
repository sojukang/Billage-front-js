import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {Default, Mobile} from "./common/Mobile";

const styles = {
    div: {
        display: "flex",
        justifyContent: "space-between",
        boxShadow: "20px 20px 20px grey",
        width: "23rem",
        height: "28rem"
    },
    img: {
        width: "8rem",
        height: "8rem",
        margin: "1em 1em 1em 1em"
    },
    a: {
        textDecorationLine: null
    },
}

export const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 23rem;
  height: 24rem;
  padding: 2em 0.5em 2em 0.5em;
  border: 1px solid #dddddd;
  border-radius: 8px;

  cursor: pointer;
  margin: 2em 2em 2em 2em;

  :hover {
    box-shadow: 0 0 10px 0 #dddddd;
  }
`;

export const MobileBookContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 24rem;
  padding: 2em 0.5em 2em 0.5em;
  border: 1px solid #dddddd;
  border-radius: 8px;

  cursor: pointer;
  margin: 2em 2em 2em 2em;

  :hover {
    box-shadow: 0 0 10px 0 #dddddd;
  }
`;

export const BookInfos = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const BookStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #61dafb;
  border-radius: 0.5rem;
  cursor: pointer;
  color: aliceblue;
  width: 5rem;
  height: 2rem;

  :hover {
    box-shadow: 0 0 10px 0 #dddddd;
  }
`;

function BookItem({id, nickname, title, imageUrl, detailMessage, lentMessage, location, status}) {
    const navigate = useNavigate();
    const toBookDetail = () => {
        if (status !== "AVAILABLE") {
            alert("지금은 빌릴 수 없어요😥")
            return;
        }
        const path = `/books/detail?id=${id}`;
        navigate(path);
    }

    function handleStatus(status) {
        switch (status) {
            case "PENDING":
            case "REQUEST":
                return "승낙 대기";
            case "UNAVAILABLE":
            case "LENT":
                return "대여 중";
            default:
                return "대여 가능";
        }
    }

    return (
        <>
            <Default>
                <BookContainer>
                    <div onClick={toBookDetail}>
                        <BookStatus>{handleStatus(status)}</BookStatus>
                        <img
                            src={imageUrl}
                            style={styles.img} alt={"Book"}/>
                        <BookInfos>{title.replace(/<[^>]*>?/g, '')}</BookInfos>
                        <BookInfos>주인: {nickname}</BookInfos>
                        <BookInfos>책 위치: {location}</BookInfos>
                        <BookInfos>남긴 말: {detailMessage}</BookInfos>
                    </div>
                </BookContainer>
            </Default>

            <Mobile>
                <MobileBookContainer>
                    <div onClick={toBookDetail}>
                        <BookStatus>{handleStatus(status)}</BookStatus>
                        <img
                            src={imageUrl}
                            style={styles.img} alt={"Book"}/>
                        <BookInfos>{title.replace(/<[^>]*>?/g, '')}</BookInfos>
                        <BookInfos>주인: {nickname}</BookInfos>
                        <BookInfos>책 위치: {location}</BookInfos>
                        <BookInfos>남긴 말: {detailMessage}</BookInfos>
                    </div>
                </MobileBookContainer>
            </Mobile>
        </>
    )
}

export default BookItem;