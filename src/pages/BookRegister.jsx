import Input from "../components/common/Input";
import Button from "../components/common/Button";
import {useLocation, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {getBook, postBookRegister} from "../BookApi";
import {useSelector} from "react-redux";

const styles = {
    div: {
        height: "100vh",
        display: "flex",
        alignItems: "center"
    },
    divChild: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    input: {
        display: "flex",
        flexDirection: "column"
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
        await postBookRegister(data, user.token).then((res) => {
            alert("책 등록 완료됐습니다.");
            navigate("/");
        }).catch((error) => {
            const responseData = error.response.data;
            alert(responseData);
        });

    }

    return (
        <div style={styles.div}>
            <div style={styles.divChild}>
                <img src={imageUrl} alt={"hi"}/>
                <p>{title}</p>
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
                <hr/>
                <Button
                    style={styles.button}
                    onClick={postRegister}
                >등록</Button>
            </div>
        </div>
    )
}

export default BookRegister;