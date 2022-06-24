import UserInput from "../../components/common/userinput/UserInput";
import {BookContainer, BookInfos} from "../../components/BookItem";
import React, {useState} from "react";
import {StyledButton} from "../BookDetail";
import {useSelector} from "react-redux";
import {deleteBook, putUpdate} from "../../BookApi";
import {useLocation, useNavigate} from "react-router-dom";
import {BookImage} from "../myinfo/MyInfoBookContainer";
import Header from "../../components/Header";
import {ContentsBox} from "../ContentsBox";


function BookUpdate() {
    const {state} = useLocation();
    const [location, setLocation] = useState('');
    const [detailMessage, setDetailMessage] = useState('');
    const user = useSelector(state => state);
    const navigate = useNavigate();
    const toMyInfo = () => {
        const path = "/me";
        navigate(path);
    }


    const handleChangeLocation = (e) => {
        setLocation(e.target.value);
    }

    const handleChangeDetailMessage = (e) => {
        setDetailMessage(e.target.value);
    }

    function updateRequest(token, id, location, detailMessage) {
        if (!token) {
            return
        }
        putUpdate(token, id, location, detailMessage)
            .then((response) => {
                alert("수정되었습니다!")
                toMyInfo();
            }).catch((error) => {
            console.log(error.response.data.message)
        })
    }

    function deleteRequest(token, id) {
        if (!token) {
            return
        }
        deleteBook(token, id)
            .then((response) => {
                alert("삭제되었습니다😭")
                toMyInfo();
            }).catch((error) => {
            console.log(error.response.data.message)
        })
    }

    return (
        <>
            <Header/>
            <ContentsBox>
                <div align="center">
                    <BookContainer>
                        <BookImage>
                            <img src={state.imageUrl} alt={"Book"}/>
                        </BookImage>
                        <BookInfos>{state.title.replace(/<[^>]*>?/g, '')}</BookInfos>
                        <BookInfos>닉네임: {state.nickname}</BookInfos>
                        <BookInfos>책 위치: {state.location}</BookInfos>
                        <BookInfos>상세 메시지: {state.detailMessage}</BookInfos>
                    </BookContainer>
                    <div>
                        <UserInput
                            type="location"
                            width="22em"
                            placeholder={state.location}
                            name="location"
                            onChange={handleChangeLocation}
                        />
                        <UserInput
                            type="detailMessage"
                            width="22em"
                            placeholder={state.detailMessage}
                            name="detailMessage"
                            onChange={handleChangeDetailMessage}
                        />
                        <StyledButton
                            onClick={() => updateRequest(user.token, state.id, location, detailMessage)}
                        >
                            수정하기✍️
                        </StyledButton>
                        <br/>
                        <StyledButton
                            onClick={() => deleteRequest(user.token, state.id)}
                        >
                            삭제하기😱
                        </StyledButton>
                    </div>
                </div>
            </ContentsBox>
        </>
    )
}

export default BookUpdate;
