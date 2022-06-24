import {BookContainer, BookInfos} from "../../components/BookItem";
import styled from "styled-components";
import React from "react";
import {Button, withStyles} from "@material-ui/core";

export const BookImage = styled.div`
  align-self: center;
  width: 8rem;
  height: 8rem;
  margin: 1em 1em 1em 1em
`;

export const MyInfoButton = withStyles({
    root: {
        width: "7rem",
        height: "3rem",
        display: "inline-block",
        marginTop: "1em",
        marginLeft: "2.5em",
        marginRight: "2.5em",
        backgroundColor: "#efd7d7",
        color: "#494848",
        fontWeight: "bold"
    },
})(Button);

function MyInfoBookContainer({id, title, imageUrl, location, lentMessage}) {
    return (
        <BookContainer>
            <BookImage>
                <img src={imageUrl} alt={"Hi"}/>
            </BookImage>
            <BookInfos>{title.replace(/<[^>]*>?/g, '')}</BookInfos>
            <BookInfos>책 위치: {location}</BookInfos>
            <BookInfos>요청 메시지: {lentMessage}</BookInfos>
        </BookContainer>
    )
}

export default MyInfoBookContainer;