import axios from "axios";

export async function getBooks() {
    const response = await axios.get(
        "http://localhost:8080/api/books"
    );
    return response.data;
}

export async function getBook(id) {
    const response = await axios.get(
        `http://localhost:8080/api/books/${id}`
    );
    return response.data;
}

export async function postSignUp(body) {
    const response = await axios.post(
        `http://localhost:8080/api/members/`,
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
        `http://localhost:8080/api/auth/login`,
        {
            email: body.email,
            password: body.password
        }
    );
    return response;
}

export async function getNaverBookSearch(title) {
    const response = await axios.get(
        `http://localhost:8080/api/naver/${title}`
    );
    return response.data;
}

export async function postBookRegister(data, token) {
    const response = await axios.post(
        `http://localhost:8080/api/books`,
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
        `http://localhost:8080/api/books/${data.id}`, {}
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
        `http://localhost:8080/api/books/me`,
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
        `http://localhost:8080/api/books/${id}/rents`,
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
        `http://localhost:8080/api/books/me/${id}`,
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

export async function deleteBook(token, id) {
    const response = await axios.delete(
        `http://localhost:8080/api/books/${id}`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`,
            },
        });
    return response;
}