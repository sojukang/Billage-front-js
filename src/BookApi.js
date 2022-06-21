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
    const testDate = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImJlb21XaGFsZUBuYXZlci5jb20iLCJpYXQiOjE2NTU4MzI2NTUsImV4cCI6MjAxNTgzMjY1NX0.UyVI26sIIpdi94NMwpcT5PMbqoe4T3nTXG8uqjiYoWI";
    const response = await axios.post(
        `http://localhost:8080/api/books`,
        {data},
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${testDate}`,
            },
        });
    return response.data;
}
