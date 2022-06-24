import {BookContainer, BookInfos} from "../../components/BookItem";
import React from "react";
import {BookImage} from "./MyInfoBookContainer";

function LentBook({id, title, imageUrl, location, detailMessage, lentMessage}) {
    return (
        <BookContainer>
            <BookImage>
                <img src={imageUrl} alt={"Hi"}/>
            </BookImage>
            <BookInfos>{title.replace(/<[^>]*>?/g, '')}</BookInfos>
            <BookInfos>책 위치: {location}</BookInfos>
            <BookInfos>상세 메시지: {detailMessage}</BookInfos>
            <BookInfos>요청 메시지: {lentMessage}</BookInfos>
        </BookContainer>
    )
}

export default LentBook