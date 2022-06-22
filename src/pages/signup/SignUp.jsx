import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
    RegisterPageContainer,
    RegisterInputContainer,
    RegisterButtonContainer,
    RegisterLabel,
} from "./styled";
import {useInputHandler} from "../UserInputHandler";
import {RANGE, registerValidator} from "../../validator/Validator";
import UserForm from "../../components/common/userinput/UserForm";
import UserInput from "../../components/common/userinput/UserInput";
import {postSignUp} from "../../BookApi";
import {Button} from "@material-ui/core";
import {theme} from "../../style";

const initialUserInfo = {
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
};

function SignUp() {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const {
        inputValue: userInfo,
        updateInputState: handleChangeInput,
        errorMessage,
        setErrorMessage,
    } = useInputHandler(registerValidator, initialUserInfo);

    const isErrorExist = Object.values(errorMessage).some((error) => error);
    const registerUserInfo = (e) => {
        e.preventDefault();

        if (isErrorExist) {
            alert("유효하지 않은 입력이 있습니다. 수정하고 가입해주세요");
            return;
        }
        requestRegister();
    };

    const requestRegister = async () => {
        try {
            setIsLoading(true);
            const response = await postSignUp({
                    email: userInfo.email,
                    nickname: userInfo.nickname,
                    password: userInfo.password,
                }).catch((error) => {
                    console.log(error.response);
                    console.log(error.request);
            })
            console.log(response.status)
            if (response.status !== 201) {
                console.log(response.data)
                const data = await response.data;
                if (data.message) {
                    setErrorMessage((prev) => ({
                        ...prev,
                        message: data.message,
                    }));
                    // throw Error(data.message);
                    throw Error("???");
                }
            }
        } catch (error) {
            setIsLoading(false);
            // alert(error.message);
            alert("???");
            return;
        }
        alert("회원가입에 성공했습니다 :D");
        navigator("/login");
        setIsLoading(false);
    };

    const handlePasswordConfirmChange = (e) => {
        handleChangeInput(e);
        comparePassword(e);
    };

    const comparePassword = ({ target: { value } }) => {
        if (userInfo.password !== value) {
            setErrorMessage((prev) => ({
                ...prev,
                passwordConfirm: "비밀번호가 일치하지 않습니다",
            }));
        }
    };

    useEffect(() => {
        return () => {
            dispatch({ type: "members/CLEAN_ERROR" });
        };
    }, []);

    return (
        <RegisterPageContainer>
            <UserForm onSubmit={registerUserInfo}>
                <RegisterInputContainer>
                    <RegisterLabel>이메일</RegisterLabel>
                    <UserInput
                        type="email"
                        minLength={RANGE.EMAIL_MIN_LENGTH}
                        maxLength={RANGE.EMAIL_MAX_LENGTH}
                        width="500px"
                        placeholder="이메일을 입력해주세요"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChangeInput}
                        required
                        autoFocus
                        errorMessage={errorMessage.email}
                    />
                </RegisterInputContainer>
                <RegisterInputContainer>
                    <RegisterLabel>닉네임</RegisterLabel>
                    <UserInput
                        type="text"
                        minLength={RANGE.USERNAME_MIN_LENGTH}
                        maxLength={RANGE.USERNAME_MAX_LENGTH}
                        width="500px"
                        placeholder="닉네임을 입력해주세요"
                        name="nickname"
                        value={userInfo.nickname}
                        onChange={handleChangeInput}
                        required
                        errorMessage={errorMessage.nickname}
                    />
                </RegisterInputContainer>
                <RegisterInputContainer>
                    <RegisterLabel>비밀번호</RegisterLabel>
                    <UserInput
                        type="password"
                        minLength={RANGE.PW_MIN_LENGTH}
                        maxLength={RANGE.PW_MAX_LENGTH}
                        width="500px"
                        placeholder="비밀번호를 입력해주세요"
                        name="password"
                        value={userInfo.password}
                        required
                        onChange={handleChangeInput}
                        errorMessage={errorMessage.password}
                    />
                </RegisterInputContainer>
                <RegisterInputContainer>
                    <RegisterLabel>비밀번호 확인</RegisterLabel>
                    <UserInput
                        type="password"
                        minLength={RANGE.PW_MIN_LENGTH}
                        maxLength={RANGE.PW_MAX_LENGTH}
                        width="500px"
                        placeholder="비밀번호를 다시 한 번 입력해주세요"
                        name="passwordConfirm"
                        value={userInfo.passwordConfirm}
                        required
                        onChange={handlePasswordConfirmChange}
                        errorMessage={errorMessage.passwordConfirm}
                    />
                </RegisterInputContainer>
                <RegisterButtonContainer>
                    <Button type="submit" width="500px">
                        가입하기
                    </Button>
                    <Link to={"/login"}>
                        <Button
                            type="button"
                            width="500px"
                            bgColor={theme.color.main}
                            textColor={theme.color.point}
                        >
                            로그인
                        </Button>
                    </Link>
                </RegisterButtonContainer>
            </UserForm>
        </RegisterPageContainer>
    );
}

export default SignUp;
