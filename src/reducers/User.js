import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
    key: "root",
    storage: storage
}

const initialState = {
    token: ""
}

export const LoginUser = (token) => {
    return {
        type: "LOGIN",
        token: token
    }
}

export const LogoutUser = () => {
    return {
        type: "LOGOUT"
    }
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                token: action.token
            }
        case "LOGOUT":
            return {
                ...state,
                token: ""
            }
        default:
            return state
    }
}

export default persistReducer(persistConfig, LoginReducer);