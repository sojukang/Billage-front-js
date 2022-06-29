import {useNavigate, useSearchParams} from "react-router-dom";
import {LoginUser} from "../../reducers/User";
import {useDispatch} from "react-redux";
import {postLoginGithubRequest} from "../../BookApi";

function LoginGithub() {
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toMain = () => {
        const path = "/";
        navigate(path);
    }

    postLoginGithubRequest({
        code: code
    }).then((res) => {
        const response = res.data;
        dispatch(LoginUser(response.accessToken));
        toMain();
    }).catch((error) => {
        const responseData = error.response.data;
        alert(responseData.message)
    })
}

export default LoginGithub;