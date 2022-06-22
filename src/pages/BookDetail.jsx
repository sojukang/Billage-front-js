import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import BookItem from "../components/BookItem";
import {getBook, postRequestBorrowing} from "../BookApi";
import {Button} from "@material-ui/core";
import UserInput from "../components/common/userinput/UserInput";
import {useSelector} from "react-redux";

function BookDetail() {
    const user = useSelector(state => state)
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const [bookItem, setBookItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const toMain = () => {
        const path = "/";
        navigate(path);
    }

    const toLogin= () => {
        const path = "/login";
        navigate(path);
    }

    function requestBorrowing(id, user) {
        postRequestBorrowing({
            id: id,
            token: user.token
        }).then((res) => {
            alert("요청이 성공하였습니다.");
            toMain();
        }).catch((error) => {
            if (!user.token) {
                alert("대여 요청을 하려면 로그인이 필요합니다💓")
                toLogin();
                return
            }
            alert("요청이 실패하였습니다.");
            console.log(error.response.data.message)
        })
    }

    useEffect(() => {
        const fetchBookItem = async () => {
            try {
                setError(null);
                setBookItem(null);
                setLoading(true);

                const response = await getBook(id);
                setBookItem(response)
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchBookItem();
    }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!bookItem) return null;

    return (
        <div>
            <BookItem
                id={id}
                title={bookItem.title}
                nickname={bookItem.nickname}
                imageUrl={bookItem.imageUrl}
                detailMessage={bookItem.detailMessage}
                location={bookItem.location}
            />
            <div>
                <UserInput
                    type="borrowingMessage"
                    width="300px"
                    placeholder="주인에게 보낼 메시지👍"
                    name="borrowingMessage"
                />
                <Button onClick={() => requestBorrowing(id, user)}>
                    빌림 요청
                </Button>
            </div>
        </div>
    )
}

export default BookDetail;
