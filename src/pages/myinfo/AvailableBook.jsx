import {BookContainer, BookInfos, MobileBookContainer} from "../../components/BookItem";
import React from "react";
import {BookImage, MobileMyInfoButton, MyInfoButton} from "./LentBookAsOwner";
import {Link} from "react-router-dom";
import {Default, Mobile} from "../../components/common/Mobile";

function AvailableBook({id, title, imageUrl, nickname, location, detailMessage, lentMessage}) {
    return (
        <>
            <Default>
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
                                  location: location
                              }}
                        >
                            <MyInfoButton>
                                수정하기✍️
                            </MyInfoButton>
                        </Link>
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
                    <BookInfos>상세 메시지: {detailMessage}</BookInfos>
                    <div>
                        <Link to={`/books/me/${id}`}
                              state={{
                                  id: id, title: title, nickname: nickname,
                                  imageUrl: imageUrl, detailMessage: detailMessage,
                                  location: location
                              }}
                        >
                            <MobileMyInfoButton>
                                수정하기✍️
                            </MobileMyInfoButton>
                        </Link>
                    </div>
                </MobileBookContainer>
            </Mobile>
        </>

    )
}

export default AvailableBook