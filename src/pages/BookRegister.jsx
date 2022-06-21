import Input from "../components/common/Input";
import Button from "../components/common/Button";
import {useLocation} from 'react-router-dom';
import {useState} from "react";
import {postBookRegister} from "../BookApi";

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
    const imageUrl = state.imageUrl;
    const title = state.title;
    const [location, setLocation] = useState('');
    const [detailMessage, setDetailMessage] = useState('');

    const onChangeHandleLocation = (e) => {
        setLocation(e.target.value);
    }

    const onChangeHandleDetailMessage = (e) => {
        setDetailMessage(e.target.value);
    }

    const postRegister = async () => {
        const data = {
            title: title,
            imageUrl: imageUrl,
            detailMessage: detailMessage,
            location: location
        }
        await postBookRegister(data);
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