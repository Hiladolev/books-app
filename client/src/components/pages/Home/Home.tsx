import { useEffect, useState } from "react";
import BooksList from "./BooksList/BooksList";
import Form from "./Form/Form";
import axios from "axios";
import Book from "../../types/Book";
const tempBooks = [
  {
    author_name: "J.R.R. Tolkien",
    cover_i: 9255566,
    key: "/works/OL27448W",
    title: "The Lord of the Rings",
  },
  {
    author_name: "J.R.R. Tolkien",
    cover_i: 8167231,
    key: "/works/OL27479W",
    title: "The Two Towers",
  },
  {
    author_name: "J.R.R. Tolkien",
    cover_i: 8474036,
    key: "/works/OL14933414W",
    title: "The Fellowship of the Ring",
  },
  {
    author_name: "J.R.R. Tolkien",
    cover_i: 10523169,
    key: "/works/OL27516W",
    title: "The Return of the King",
  },
  {
    author_name: "J.R.R. Tolkien",
    cover_i: 8406786,
    key: "/works/OL262758W",
    title: "The Hobbit",
  },
];

export default function Home() {
  const [savedBooks, setSavedBooks] = useState<Book[]>(tempBooks);

  const handleBooksChanges = (book: Book) => {
    //   .post("http://localhost:5173/api/book", book)
    //   .then((response) => console.log(response));
    setSavedBooks((current) => [...current, book]);
  };
  // const fetchSavedBooks = () => {
  //   axios
  //     .get(`http://localhost:5173/api/savedBooks`)
  //     .then((response) => setSavedBooks(response));
  // };
  // useEffect(() => {
  //   fetchSavedBooks();
  // }, []);

  return (
    <>
      <Form addBook={handleBooksChanges} />
      {/* dont forget to add condition - if the there are saved books */}
      <BooksList savedBooks={savedBooks} />
    </>
  );
}
