import React from 'react';
import {useNavigate} from "react-router-dom";

const styles = {
    div: {
        display: "flex",
        justifyContent: "space-between",
        boxShadow: "20px 20px 20px grey",
    },
    img: {
        width: "23rem"
    },
    a: {
        textDecorationLine: null
    }
}

function BookItem({id, nickname, title, imageUrl, detailMessage, location}) {
    const navigate = useNavigate();
    const toBookDetail = () => {
        const path = `/books/detail?id=${id}`;
        navigate(path);
    }

    return (
        <div onClick={toBookDetail}>
            <img
                src={"https://velog.velcdn.com/images%2Fnzlk112%2Fpost%2Ff66ec130-89e2-4ec2-97ea-b3bf55d28ecd%2Fimage.png"}
                style={styles.img} alt={"Book"}/>
            <p>책 이름: {title}</p>
            <p>닉네임: {nickname}</p>
            {detailMessage && <p>상세 메시지: {detailMessage}</p>}
            <p>책의 위치: {location}</p>
        </div>
    )
}

export default BookItem;