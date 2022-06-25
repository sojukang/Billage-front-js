import {BookContainer, BookInfos, MobileBookContainer} from "../../components/BookItem";
import styled from "styled-components";
import React from "react";
import {Button, withStyles} from "@material-ui/core";
import {useSelector} from "react-redux";
import {putReturning} from "../../BookApi";
import {Default, Mobile} from "../../components/common/Mobile";

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

export const MobileMyInfoButton = withStyles({
    root: {
        width: "6rem",
        height: "3rem",
        display: "inline-block",
        marginTop: "0.5em",
        marginLeft: "2em",
        marginRight: "2em",
        backgroundColor: "#efd7d7",
        color: "#494848",
        fontWeight: "bold"
    },
})(Button);


function LentBookAsOwner({id, title, imageUrl, location, lentMessage, detailMessage}) {
    const user = useSelector(state => state);

    function returningRequest(token) {
        if (!token) {
            return
        }
        putReturning(token, id)
            .then((response) => {
                alert("반납 승인하였습니다🙆.")
                window.location.reload();
            }).catch((error) => {
            console.log(error.response.data.message)
        })
    }

    return (
        <>
            <Default>
                <BookContainer>
                    <BookImage>
                        <img src={imageUrl} alt={"Hi"}/>
                    </BookImage>
                    <BookInfos>{title.replace(/<[^>]*>?/g, '')}</BookInfos>
                    <BookInfos>책 위치: {location}</BookInfos>
                    <BookInfos>요청 메시지: {lentMessage}</BookInfos>
                    <div>
                        <MyInfoButton onClick={() => returningRequest(user.token)}>
                            반납승인🙆
                        </MyInfoButton>
                    </div>
                </BookContainer>
            </Default>

            <Mobile>
                <MobileBookContainer>
                    <BookImage>
                        <img src={imageUrl} alt={"Hi"}/>
                    </BookImage>
                    <BookInfos>{title.replace(/<[^>]*>?/g, '')}</BookInfos>
                    <BookInfos>책 위치: {location}</BookInfos>
                    <BookInfos>요청 메시지: {lentMessage}</BookInfos>
                    <div>
                        <MobileMyInfoButton onClick={() => returningRequest(user.token)}>
                            반납승인🙆
                        </MobileMyInfoButton>
                    </div>
                </MobileBookContainer>
            </Mobile>
        </>
    )
}

export default LentBookAsOwner;