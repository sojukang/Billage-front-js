import {BookContainer, BookInfos} from "../../components/BookItem";
import React, {useEffect} from "react";
import {BookImage, MyInfoButton} from "./LentBookAsOwner";
import {postAllowOrDenyRent} from "../../BookApi";
import {useSelector} from "react-redux";

function PendingBook({id, title, imageUrl, location, lentMessage}) {
    const user = useSelector(state => state);

    function denyRequest(token) {
        if (!token) {
            return
        }
        postAllowOrDenyRent(token, id, "DENY")
            .then((response) => {
                alert("거절하였습니다❌.")
                window.location.reload();
            }).catch((error) => {
            console.log(error.response.data.message)
        })
    }

    function allowRequest(token) {
        if (!token) {
            return
        }
        postAllowOrDenyRent(token, id, "ALLOW")
            .then((response) => {
                alert("승낙하였습니다⭕.")
                window.location.reload();
            }).catch((error) => {
            console.log(error.response.data.message)
        })
    }

    return (
        <BookContainer>
            <BookImage>
                <img src={imageUrl} alt={"Hi"}/>
            </BookImage>
            <BookInfos>{title.replace(/<[^>]*>?/g, '')}</BookInfos>
            <BookInfos>책 위치: {location}</BookInfos>
            <BookInfos>요청 메시지: {lentMessage}</BookInfos>
            <div>
                <MyInfoButton onClick={() => denyRequest(user.token)}>
                    거절❌
                </MyInfoButton>
                <MyInfoButton onClick={() => allowRequest(user.token)}>
                    승낙⭕
                </MyInfoButton>
            </div>

        </BookContainer>
    )
}

export default PendingBook