import Input from "../components/common/Input";
import Button from "../components/common/Button";
import {useLocation, useNavigate} from 'react-router-dom';
import React, {useState} from "react";
import {postBookRegister} from "../BookApi";
import {useSelector} from "react-redux";
import {ContentsBox} from "./ContentsBox";
import Header from "../components/Header";
import {SelectButton} from "./BookSearch";

const styles = {
    div: {
        height: "80vh",
        display: "flex",
        alignItems: "center",
        marginBottom: "10vh"
    },
    divChild: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    input: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "2vh"
    },
    button: {
        backgroundColor: "gray"
    }
}

function BookRegister() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const imageUrl = state.imageUrl;
    const title = state.title;
    const [location, setLocation] = useState('');
    const [detailMessage, setDetailMessage] = useState('');
    const user = useSelector(state => state);


    const onChangeHandleLocation = (e) => {
        setLocation(e.target.value);
    }

    const onChangeHandleDetailMessage = (e) => {
        setDetailMessage(e.target.value);
    }

    const postRegister = async () => {
        if (!user.token) {
            alert("로그인이 필요합니다.")
            navigate("/login")
        }
        const data = {
            title: title,
            imageUrl: imageUrl,
            detailMessage: detailMessage,
            location: location
        }
        await postBookRegister(data, user.token).then(() => {
            alert("책 등록 완료됐습니다.");
            navigate("/");
        })

    }

    return (
        <>
            <Header/>
            <ContentsBox>
                <div style={styles.div}>
                    <div style={styles.divChild}>
                        <img src={imageUrl} alt={"hi"}/>
                        <p>
                            {title.replace(/<[^>]*>?/g, '')}
                        </p>
                        <Input
                            style={styles.input}
                            placeholder={"책 위치"}
                            onChange={onChangeHandleLocation}
                        />
                        <Input
                            style={styles.input}
                            placeholder={"상세 메시지"}
                            onChange={onChangeHandleDetailMessage}
                        />
                        <SelectButton
                            onClick={postRegister}
                        >등록📚</SelectButton>
                    </div>
                </div>
            </ContentsBox>
        </>
    )
}

export default BookRegister;