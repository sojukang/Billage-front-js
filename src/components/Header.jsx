import {Link} from "react-router-dom";
import Button from "./common/Button";

const styles = {
    div: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: 'skyblue',
        height: "3em",
        alignItems: "center",
        boxShadow: "0px 0px 20px 0px #A8A8A8FF"
    },

    button: {
        backgroundColor: 'skyblue',
        fontSize: "1rem",
    },

    logo: {
        fontSize: "1.5em"
    }
}


function Header() {

    return (
        <div style={styles.div}>
            <div>
                <Button style={styles.logo}>Billage</Button>
                <Link to="/signup">
                    <Button id={"register"} style={styles.button}>회원가입</Button>
                </Link>
                <Link to="/login">
                    <Button id={"login"} style={styles.button}>로그인</Button>
                </Link>
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