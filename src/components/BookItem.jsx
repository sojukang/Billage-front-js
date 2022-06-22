import React from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

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

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 24rem;
  padding: 2em;
  border: 1px solid #dddddd;
  //border: none;
  border-radius: 8px;

  cursor: pointer;
  margin: 2em 2em 2em 2em;

  :hover {
    box-shadow: 0 0 10px 0 #dddddd;
  }
`;

const BookInfos = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

function BookItem({id, nickname, title, imageUrl, detailMessage, location}) {
    const navigate = useNavigate();
    const toBookDetail = () => {
        const path = `/books/detail?id=${id}`;
        navigate(path);
    }

    return (
        <BookContainer>
            <div onClick={toBookDetail}>
                <img
                    src={imageUrl}
                    style={styles.img} alt={"Book"}/>
                <BookInfos>{title.replace(/<[^>]*>?/g, '')}</BookInfos>
                <BookInfos>닉네임: {nickname}</BookInfos>
                <BookInfos>책 위치: {location}</BookInfos>
                <BookInfos>메시지: {detailMessage}</BookInfos>
            </div>
        </BookContainer>
    )
}

export default BookItem;