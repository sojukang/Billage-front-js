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
        `http://localhost:8080/auth/login`,
        {
            email: body.email,
            password: body.password
        }
    );
    return response;
}