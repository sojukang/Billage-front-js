import Button from "./common/Button";
import {Link} from "react-router-dom";

const styles = {
    div: {
        display: "flex",
        justifyContent: "space-between"
    },
    button: {
        backgroundColor: 'skyblue'
    }
}

function Header() {

    return (
        <div style={styles.div}>
            <div>
                <Button id={"register"} style={styles.button}>회원가입</Button>
                <Button id={"login"} style={styles.button}>로그인</Button>
            </div>
            <div>
                <Link to={"/books/search"}>
                <Button id={"bookRegister"} style={styles.button}>책 등록</Button>
                </Link>
                <Button id={"info"} style={styles.button}>내 정보</Button>
            </div>
        </div>
    )
}

export default Header;