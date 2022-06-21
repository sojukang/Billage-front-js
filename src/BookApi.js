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

export async function getNaverBookSearch(title) {
    const response = await axios.get(
        `http://localhost:8080/api/naver/${title}`
    );
    return response.data;
}

export async function postBookRegister(data) {
    const response = await axios.post(
        `http://localhost:8080/api/books`,
        {data},
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer `,
            },
        });
    return response.data;
}
