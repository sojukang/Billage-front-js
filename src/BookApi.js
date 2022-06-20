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