import {BookContainer, BookInfos} from "../../components/BookItem";
import React from "react";
import {BookImage, MyInfoButton} from "./MyInfoBookContainer";
import {useSelector} from "react-redux";
import {postAllowOrDenyRent} from "../../BookApi";
import {Link} from "react-router-dom";

function AvailableBook({id, title, imageUrl, nickname, location, detailMessage, lentMessage}) {
    return (
        <BookContainer>
            <BookImage>
                <img src={imageUrl} alt={"Hi"}/>
            </BookImage>
            <BookInfos>{title.replace(/<[^>]*>?/g, '')}</BookInfos>
            <BookInfos>책 위치: {location}</BookInfos>
            <BookInfos>상세 메시지: {detailMessage}</BookInfos>
            <div>
                <Link to={`/books/me/${id}`}
                      state={{
                          id: id, title: title, nickname: nickname,
                          imageUrl: imageUrl, detailMessage: detailMessage,
                          location: location}}
                >
                    <MyInfoButton>
                        수정하기✍️
                    </MyInfoButton>
                </Link>
            </div>

        </BookContainer>
    )
}

export default AvailableBook