import axios from "axios";

const BASE_URL = "http://ec2-54-180-124-23.ap-northeast-2.compute.amazonaws.com:8080/api"

export async function getBooks() {
    const response = await axios.get(
        `${BASE_URL}/books`
    );
    return response.data;
}

export async function getBook(id) {
    const response = await axios.get(
        `${BASE_URL}/books/${id}`
    );
    return response.data;
}

export async function postSignUp(body) {
    const response = await axios.post(
        `${BASE_URL}/members/`,
        {
            email: body.email,
            nickname: body.nickname,
            password: body.password
        }
    );
    return response;
}

export async function postLogin(body) {
    const response = await axios.post(
        `${BASE_URL}/auth/login`,
        {
            email: body.email,
            password: body.password
        }
    );
    return response;
}

export async function postLoginGithubRequest(body) {
    const response = await axios.post(
        `${BASE_URL}/auth/login/github`,
        {
            code: body.code,
        }
    );
    return response;
}

export async function getNaverBookSearch(title) {
    const response = await axios.get(
        `${BASE_URL}/naver/${title}`
    );
    return response.data;
}

export async function postBookRegister(data, token) {
    const response = await axios.post(
        `${BASE_URL}/books`,
        data,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`,
            },
        });
    return response.data;
}

export async function postRequestRent(data) {
    const response = await axios.post(
        `${BASE_URL}/books/${data.id}`, {
            requestMessage: data.lentMessage
        }
        ,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${data.token}`,
            },
        });
    return response.data;
}

export async function getBooksByUser(token) {
    const response = await axios.get(
        `${BASE_URL}/books/me`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`,
            },
        });
    return response.data;
}

export async function getLentBooksByUser(token) {
    const response = await axios.get(
        `${BASE_URL}/books/me/lent`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`,
            },
        });
    return response.data;
}

export async function getRequestBooksByUser(token) {
    const response = await axios.get(
        `${BASE_URL}/books/client`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`,
            },
        });
    return response.data;
}

export async function postAllowOrDenyRent(token, id, allowOrDeny) {
    const response = await axios.post(
        `${BASE_URL}/books/${id}/lents`,
        {
            allowOrDeny: allowOrDeny
        },
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`,
            },
        });
    return response;
}

export async function putUpdate(token, id, location, detailMessage) {
    const response = await axios.put(
        `${BASE_URL}/books/me/${id}`,
        {
            location: location,
            detailMessage: detailMessage
        },
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`,
            },
        });
    return response;
}

export async function putReturning(token, id) {
    const response = await axios.put(
        `${BASE_URL}/books/${id}`,
        {},
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`,
            },
        });
    return response;
}

export async function deleteBook(token, id) {
    const response = await axios.delete(
        `${BASE_URL}/books/${id}`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`,
            },
        });
    return response;
}