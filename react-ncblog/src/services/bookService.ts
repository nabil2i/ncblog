import Book from "../entities/Book";
import APIClient from "./api-client";

export default new APIClient<Book, Book>('/books');
