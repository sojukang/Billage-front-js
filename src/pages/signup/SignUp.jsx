import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {RegisterButtonContainer, RegisterInputContainer, RegisterPageContainer, StyledButton,} from "./styled";
import {useInputHandler} from "../UserInputHandler";
import {RANGE, registerValidator} from "../../validator/Validator";
import UserForm from "../../components/common/userinput/UserForm";
import UserInput from "../../components/common/userinput/UserInput";
import {postSignUp} from "../../BookApi";
import {ContentsBox} from "../ContentsBox";
import Header from "../../components/Header";
import {Default, Mobile, MobileStyledButton} from "../../components/common/Mobile";



const initialUserInfo = {
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
};

function SignUp() {
    const navigator = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const {
        inputValue: userInfo,
        updateInputState: handleChangeInput,
        errorMessage,
        setErrorMessage,
    } = useInputHandler(registerValidator, initialUserInfo);

    const registerUserInfo = (e) => {
        e.preventDefault();
        requestRegister();
    };

    const requestRegister = async () => {
        setIsLoading(true);
        const response = await postSignUp({
            email: userInfo.email,
            nickname: userInfo.nickname,
            password: userInfo.password,
        }).then((res) => {
            alert("회원가입에 성공했습니다 :D");
            navigator("/login");
            setIsLoading(false);
        }).catch((error) => {
            const responseData = error.response.data;
            if (responseData.message) {
                setErrorMessage((prev) => ({
                    ...prev,
                    message: responseData.message,
                }))
            }
            alert(responseData.message)
        });
    };
    const handlePasswordConfirmChange = (e) => {
        handleChangeInput(e);
        comparePassword(e);
    };

    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            requestRegister()
        }
    }

    const comparePassword = ({target: {value}}) => {
        if (userInfo.password !== value) {
            setErrorMessage((prev) => ({
                ...prev,
                passwordConfirm: "비밀번호가 일치하지 않습니다",
            }));
        }
    };

    return (
        <>
            <Header/>
            <ContentsBox>
                <Default>
                    <RegisterPageContainer>
                        <UserForm onSubmit={registerUserInfo}>
                            <RegisterInputContainer>
                                <UserInput
                                    type="email"
                                    minLength={RANGE.EMAIL_MIN_LENGTH}
                                    maxLength={RANGE.EMAIL_MAX_LENGTH}
                                    width="38rem"
                                    placeholder="알림 메일을 받을 이메일을 입력해주세요"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleChangeInput}
                                    required
                                    autoFocus
                                    errorMessage={errorMessage.email}
                                />
                            </RegisterInputContainer>
                            <RegisterInputContainer>
                                <UserInput
                                    type="text"
                                    minLength={RANGE.USERNAME_MIN_LENGTH}
                                    maxLength={RANGE.USERNAME_MAX_LENGTH}
                                    width="38rem"
                                    placeholder="닉네임을 입력해주세요"
                                    name="nickname"
                                    value={userInfo.nickname}
                                    onChange={handleChangeInput}
                                    required
                                    errorMessage={errorMessage.nickname}
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
                                    value={userInfo.password}
                                    required
                                    onChange={handleChangeInput}
                                    errorMessage={errorMessage.password}
                                />
                            </RegisterInputContainer>
                            <RegisterInputContainer>
                                <UserInput
                                    type="password"
                                    minLength={RANGE.PW_MIN_LENGTH}
                                    maxLength={RANGE.PW_MAX_LENGTH}
                                    width="38rem"
                                    placeholder="비밀번호를 다시 한 번 입력해주세요"
                                    name="passwordConfirm"
                                    value={userInfo.passwordConfirm}
                                    required
                                    onChange={handlePasswordConfirmChange}
                                    onKeyPress={handleKeyPress}
                                    errorMessage={errorMessage.passwordConfirm}
                                />
                            </RegisterInputContainer>
                            <RegisterButtonContainer>
                                <StyledButton type="submit">
                                    가입하기
                                </StyledButton>
                                <Link to={"/login"}>
                                    <StyledButton>
                                        로그인
                                    </StyledButton>
                                </Link>
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
                        <UserForm onSubmit={registerUserInfo}>
                            <RegisterInputContainer>
                                <UserInput
                                    type="email"
                                    minLength={RANGE.EMAIL_MIN_LENGTH}
                                    maxLength={RANGE.EMAIL_MAX_LENGTH}
                                    width="18rem"
                                    placeholder="알림 메일을 받을 이메일을 입력해주세요"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleChangeInput}
                                    required
                                    autoFocus
                                    errorMessage={errorMessage.email}
                                />
                            </RegisterInputContainer>
                            <RegisterInputContainer>
                                <UserInput
                                    type="text"
                                    minLength={RANGE.USERNAME_MIN_LENGTH}
                                    maxLength={RANGE.USERNAME_MAX_LENGTH}
                                    width="18rem"
                                    placeholder="닉네임을 입력해주세요"
                                    name="nickname"
                                    value={userInfo.nickname}
                                    onChange={handleChangeInput}
                                    required
                                    errorMessage={errorMessage.nickname}
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
                                    value={userInfo.password}
                                    required
                                    onChange={handleChangeInput}
                                    errorMessage={errorMessage.password}
                                />
                            </RegisterInputContainer>
                            <RegisterInputContainer>
                                <UserInput
                                    type="password"
                                    minLength={RANGE.PW_MIN_LENGTH}
                                    maxLength={RANGE.PW_MAX_LENGTH}
                                    width="18rem"
                                    placeholder="비밀번호를 다시 한 번 입력해주세요"
                                    name="passwordConfirm"
                                    value={userInfo.passwordConfirm}
                                    required
                                    onChange={handlePasswordConfirmChange}
                                    onKeyPress={handleKeyPress}
                                    errorMessage={errorMessage.passwordConfirm}
                                />
                            </RegisterInputContainer>
                            <RegisterButtonContainer>
                                <MobileStyledButton type="submit">
                                    가입하기
                                </MobileStyledButton>
                                <Link to={"/login"}>
                                    <MobileStyledButton>
                                        로그인
                                    </MobileStyledButton>
                                </Link>
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
    );
}


export default SignUp;
