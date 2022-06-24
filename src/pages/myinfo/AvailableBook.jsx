import {BookContainer, BookInfos} from "../../components/BookItem";
import React from "react";
import {BookImage, MyInfoButton} from "./MyInfoBookContainer";

function AvailableBook({id, title, imageUrl, location, lentMessage}) {
    return (
        <BookContainer>
            <BookImage>
                <img src={imageUrl} alt={"Hi"}/>
            </BookImage>
            <BookInfos>{title.replace(/<[^>]*>?/g, '')}</BookInfos>
            <BookInfos>책 위치: {location}</BookInfos>
            <BookInfos>요청 메시지: {lentMessage}</BookInfos>
            <div>
                <MyInfoButton>
                    수정하기✍️
                </MyInfoButton>
            </div>

        </BookContainer>
    )
}

export default AvailableBook