import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Book from "../../../types/Book";
import "./Form.css";

interface FormProps {
  addBook: (book: Book) => void;
}

export default function Form({ addBook }: FormProps) {
  const searchEndpoint = "https://openlibrary.org/search.json?q=";
  const { register, handleSubmit } = useForm();
  const [foundBooks, setFoundBooks] = useState<Book[]>([]);
  const notFoundMessage = <p>No results found</p>;
  const [noFoundBooks, setNotFoundBooks] = useState(false);
  const replace_space = (author: string) => {
    return author.replaceAll(" ", "+");
  };
  const onSubmit = handleSubmit((data) => {
    // dont forget to remove the limit in the url below
    axios
      .get(
        searchEndpoint +
          `title:${data.title}+author:${replace_space(
            data.author_name
          )}&limit=10
    `
      )
      .then((response) => {
        console.log(response);
        if (response.data.numFound === 0) {
          setNotFoundBooks(true);
        } else {
          const requiredProperties = response.data.docs.map(
            ({ title, author_name, cover_i, key }: Book) => ({
              title,
              author_name: Array.isArray(author_name)
                ? author_name.join(", ")
                : author_name,
              cover_i,
              key,
            })
          );
          setFoundBooks(requiredProperties);
          setNotFoundBooks(false);
        }
      });
  });

  const checked =
    (book: Book) => (event: React.MouseEvent<HTMLInputElement>) => {
      if (event.currentTarget.checked === true) {
        addBook(book);
      }
      // axios
      //   .post("http://localhost:5173/api/book", book)
      //   .then((response) => console.log(response));
    };

  return (
    <>
      <form onSubmit={onSubmit} className="form-inputs">
        <input type="text" placeholder="Title" {...register("title")} />
        <input
          type="text"
          placeholder="Author name"
          {...register("author_name")}
        />
        <input type="submit" value="Submit" />
      </form>
      {noFoundBooks && notFoundMessage}
      {foundBooks.length > 0 && (
        <fieldset>
          <legend>Save your favorite books:</legend>
          {foundBooks.map((book: Book) => (
            <div key={book.key}>
              <input
                type="checkbox"
                id={book.key}
                name={book.title}
                onClick={checked(book)}
              />
              <label htmlFor={book.title}>{book.title}</label>
            </div>
          ))}
        </fieldset>
      )}
    </>
  );
}
