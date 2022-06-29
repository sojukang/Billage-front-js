import UserForm from "../../components/common/userinput/UserForm";
import {RegisterButtonContainer, RegisterInputContainer, RegisterPageContainer, StyledButton} from "../signup/styled";
import UserInput from "../../components/common/userinput/UserInput";
import {RANGE, registerValidator} from "../../validator/Validator";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postLogin} from "../../BookApi";
import {LoginUser} from "../../reducers/User";
import {useInputHandler} from "../UserInputHandler";
import Header from "../../components/Header";
import {ContentsBox} from "../ContentsBox";
import {Default, Mobile, MobileStyledButton} from "../../components/common/Mobile";

const initialUserInfo = {
    email: "",
    password: ""
}


function Login() {
    const {
        errorMessage,
        setErrorMessage
    } = useInputHandler(registerValidator, initialUserInfo);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toMain = () => {
        const path = "/";
        navigate(path);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            signIn()
        }
    }

    const signIn = () => {
        postLogin({email, password})
            .then((res) => {
                const response = res.data;
                dispatch(LoginUser(response.accessToken));
                alert("로그인 완료")
                toMain();
            }).catch((error) => {
            const responseData = error.response.data;
            if (responseData.message) {
                setErrorMessage((prev) => ({
                    ...prev,
                    message: responseData.message,
                }))
            }
            alert(responseData.message)
        })

    }

    return (
        <>
            <Header/>
            <ContentsBox>
                <Default>
                    <RegisterPageContainer>
                        <UserForm>
                            <RegisterInputContainer>
                                <UserInput
                                    type="email"
                                    minLength={RANGE.EMAIL_MIN_LENGTH}
                                    maxLength={RANGE.EMAIL_MAX_LENGTH}
                                    width="38rem"
                                    placeholder="이메일을 입력해주세요"
                                    name="email"
                                    onChange={handleChangeEmail}
                                    required
                                    autoFocus
                                    errorMessage={errorMessage.email}
                                />
                            </RegisterInputContainer>
                            <RegisterInputContainer>
                                <UserInput
                                    type="password"
                                    minLength={RANGE.PW_MIN_LENGTH}
                                    maxLength={RANGE.PW_MAX_LENGTH}
                                    width="38rem"
                                    placeholder="비밀번호를 입력해주세요"
                                    name="password"
                                    required
                                    onChange={handleChangePassword}
                                    onKeyPress={handleKeyPress}
                                    errorMessage={errorMessage.password}
                                />
                            </RegisterInputContainer>
                            <RegisterButtonContainer>
                                <StyledButton
                                    onClick={signIn}>
                                    로그인
                                </StyledButton>
                                <StyledButton>
                                    <a
                                        href="https://github.com/login/oauth/authorize?client_id=8d5a7b484e8b5802f868&redirect_uri=http://billage.site/login/oauth"
                                    >GitHub 아이디로 로그인</a>
                                </StyledButton>
                                <Link to={"/"}>
                                    <StyledButton>
                                        홈으로
                                    </StyledButton>
                                </Link>
                            </RegisterButtonContainer>
                        </UserForm>
                    </RegisterPageContainer>
                </Default>

                <Mobile>
                    <RegisterPageContainer>
                        <UserForm>
                            <RegisterInputContainer>
                                <UserInput
                                    type="email"
                                    minLength={RANGE.EMAIL_MIN_LENGTH}
                                    maxLength={RANGE.EMAIL_MAX_LENGTH}
                                    width="18rem"
                                    placeholder="이메일을 입력해주세요"
                                    name="email"
                                    onChange={handleChangeEmail}
                                    required
                                    autoFocus
                                    errorMessage={errorMessage.email}
                                />
                            </RegisterInputContainer>
                            <RegisterInputContainer>
                                <UserInput
                                    type="password"
                                    minLength={RANGE.PW_MIN_LENGTH}
                                    maxLength={RANGE.PW_MAX_LENGTH}
                                    width="18rem"
                                    placeholder="비밀번호를 입력해주세요"
                                    name="password"
                                    required
                                    onChange={handleChangePassword}
                                    onKeyPress={handleKeyPress}
                                    errorMessage={errorMessage.password}
                                />
                            </RegisterInputContainer>
                            <RegisterButtonContainer>
                                <MobileStyledButton
                                    onClick={signIn}>
                                    로그인
                                </MobileStyledButton>
                                <Link to={"/"}>
                                    <MobileStyledButton>
                                        홈으로
                                    </MobileStyledButton>
                                </Link>
                            </RegisterButtonContainer>
                        </UserForm>
                    </RegisterPageContainer>
                </Mobile>
            </ContentsBox>
        </>
    )
}

export default Login;