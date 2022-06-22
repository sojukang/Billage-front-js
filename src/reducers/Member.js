import {postLogin} from "../BookApi";
import {getCookie} from "../Cookie";

const JWT_COOKIE_KEY = "token";
const USER_ID_KEY = "userId";

export const USER_ACTION = {
    LOGIN: "member/LOGIN",
    LOGIN_SUCCESS: "member/LOGIN_SUCCESS",
    LOGIN_ERROR: "member/LOGIN_ERROR",

    CLEAN_ERROR: "member/CLEAN_ERROR",

    LOGOUT: "member/LOGOUT",
};

export const login = (email, password) => async (dispatch) => {
    dispatch({type: USER_ACTION.LOGIN});
    try {
        const response = await postLogin({
            email: email,
            password: password,
        });

        const data = await response.data.json();
        if (data.message) {
            throw new Error(data.message);
        }

        dispatch({
            type: USER_ACTION.LOGIN_SUCCESS,
            member: {
                ...data,
                nickname: data.nickname,
            },
        });
    } catch (error) {
        dispatch({
            type: USER_ACTION.LOGIN_ERROR,
            errorMessage: error.message,
        });
    }
};

const initialState = {
    isLogin: !!getCookie(JWT_COOKIE_KEY),
    isLoading: false,
    data: {
        email: "",
        nickname: "",
    },
    errorMessage: "",
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_ACTION.LOGIN:
            return {
                ...state,
                isLoading: true,
                errorMessage: "",
            };
        case USER_ACTION.LOGOUT:
            return {...initialState, isLogin: false};
        case USER_ACTION.LOGIN_SUCCESS:
            return {
                isLogin: true,
                isLoading: false,
                data: action.member,
                errorMessage: "",
            };
        case USER_ACTION.LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.errorMessage,
            };
        case USER_ACTION.CLEAN_ERROR:
            return {
                ...state,
                errorMessage: "",
            };
        default:
            return state;
    }
};

export default reducer;
