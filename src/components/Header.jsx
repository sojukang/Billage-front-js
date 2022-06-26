import {Link} from "react-router-dom";
import Button from "./common/Button";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {LogoutUser} from "../reducers/User";
import BasicMenu from "./common/BasicMenu";
import {Default, Mobile} from "./common/Mobile";

const themeColor = "#87CEEB"

const styles = {
    div: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: `${themeColor}`,
        height: "3em",
        alignItems: "center",
        boxShadow: "0px 0px 20px 0px #A8A8A8FF"
    },

    button: {
        backgroundColor: `${themeColor}`,
        fontSize: "1rem",
    },

    logo: {
        fontSize: "1.5em"
    }
}

function Header() {
    const user = useSelector(state => state);
    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.token) {
            setIsLogin(true);
        }
    }, [user])

    const handleLogout = () => {
        dispatch(LogoutUser());
        setIsLogin(false)
    }

    return (
        <div style={styles.div}>
            <div>
                <Link to="/">
                    <Button style={styles.logo}>📖Billage</Button>
                </Link>
                {isLogin ?
                    <>
                        <Link to="/">
                            <Button
                                id={"logout"} style={styles.button}
                                onClick={handleLogout}
                            >로그아웃</Button>
                        </Link>
                    </>
                    :
                    <>
                        <Link to="/signup">
                            <Button id={"register"} style={styles.button}>회원가입</Button>
                        </Link>
                        <Link to="/login">
                            <Button id={"login"} style={styles.button}>로그인</Button>
                        </Link>
                    </>
                }
            </div>
            <Default>
                {isLogin &&
                    <div>
                        <Link to={"/books/search"}>
                            <Button id={"bookRegister"} style={styles.button}>책 등록</Button>
                        </Link>
                        <Link to={"/me"}>
                            <Button id={"info"} style={styles.button}>등록한 책</Button>
                        </Link>
                        <Link to={"/me/client"}>
                            <Button id={"info"} style={styles.button}>빌린 책</Button>
                        </Link>
                    </div>
                }
            </Default>

            <Mobile>
                {isLogin && <BasicMenu/>}
            </Mobile>
        </div>
    )
}

export default Header;