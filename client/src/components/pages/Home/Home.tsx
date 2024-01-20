import { useEffect, useState } from "react";
import BooksList from "./BooksList/BooksList";
import Form from "./Form/Form";
import axios from "axios";
import Book from "../../types/Book";

export default function Home() {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);

  const handleBooksChanges = (book: Book) => {
    console.log(book);
    axios
      .post(`http://localhost:5173/api/book`, book)
      .then((response) => console.log(response));
    setSavedBooks((current) => [...current, book]);
  };
  const fetchSavedBooks = () => {
    axios
      .get(`http://localhost:5173/api/savedBooks`)
      .then((response) => setSavedBooks(response.data));
  };
  useEffect(() => {
    fetchSavedBooks();
  }, []);

  return (
    <>
      <Form addBook={handleBooksChanges} />
      {savedBooks.length > 0 && <BooksList savedBooks={savedBooks} />}
    </>
  );
}
