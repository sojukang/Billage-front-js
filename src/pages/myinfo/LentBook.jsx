import {BookContainer, BookInfos, MobileBookContainer} from "../../components/BookItem";
import React from "react";
import {BookImage} from "./LentBookAsOwner";
import {Default, Mobile} from "../../components/common/Mobile";

function LentBook({id, title, nickname, imageUrl, location, detailMessage, lentMessage, status}) {
    return (
        <>
            <Default>
                <BookContainer>
                    <BookImage>
                        <img src={imageUrl} alt={"Hi"} width="80rem" height="100rem"/>
                    </BookImage>
                    <BookInfos>{title.replace(/<[^>]*>?/g, '')}</BookInfos>
                    <BookInfos>주인: {nickname}</BookInfos>
                    <BookInfos>책 위치: {location}</BookInfos>
                    <BookInfos>남긴 말: {detailMessage}</BookInfos>
                </BookContainer>
            </Default>

            <Mobile>
                <MobileBookContainer>
                    <BookImage>
                        <img src={imageUrl} alt={"Hi"} width="80rem" height="100rem"/>
                    </BookImage>
                    <BookInfos>{title.replace(/<[^>]*>?/g, '')}</BookInfos>
                    <BookInfos>주인: {nickname}</BookInfos>
                    <BookInfos>책 위치: {location}</BookInfos>
                    <BookInfos>남긴 말: {detailMessage}</BookInfos>
                </MobileBookContainer>
            </Mobile>
        </>
    )
}

export default LentBook
