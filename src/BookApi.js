import axios from "axios";

const BASE_URL = "http://54.180.124.23:8080"

export async function getBooks() {
    const response = await axios.get(
        `${BASE_URL}/api/books`
    );
    return response.data;
}

export async function getBook(id) {
    const response = await axios.get(
        `${BASE_URL}/api/books/${id}`
    );
    return response.data;
}

export async function postSignUp(body) {
    const response = await axios.post(
        `${BASE_URL}/api/members/`,
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
        `${BASE_URL}/api/auth/login`,
        {
            email: body.email,
            password: body.password
        }
    );
    return response;
}

export async function getNaverBookSearch(title) {
    const response = await axios.get(
        `${BASE_URL}/api/naver/${title}`
    );
    return response.data;
}

export async function postBookRegister(data, token) {
    const response = await axios.post(
        `${BASE_URL}/api/books`,
        data,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`,
            },
        });
    return response.data;
}

export async function postRequestBorrowing(data) {
    const response = await axios.post(
        `${BASE_URL}/api/books/${data.id}`, {}
        ,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${data.token}`,
            },
        });
    return response.data;
}