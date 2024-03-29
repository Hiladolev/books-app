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
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [foundBooks, setFoundBooks] = useState<Book[]>([]);
  const notFoundMessage = <p>No results found</p>;
  const [noFoundBooks, setNotFoundBooks] = useState(false);
  const replace_space = (author: string) => {
    return author.replaceAll(" ", "+");
  };
  const onSubmit = handleSubmit((data) => {
    setIsLoading(true);
    axios
      .get(
        searchEndpoint +
          `title:${data.title}+author:${replace_space(data.author_name)}
    `
      )
      .then((response) => {
        setIsLoading(false);
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
    reset();
  });

  const checked =
    (book: Book) => (event: React.MouseEvent<HTMLInputElement>) => {
      if (event.currentTarget.checked === true) {
        addBook(book);
      }
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
        <input type="submit" value={isLoading ? "loading..." : "Submit"} />
      </form>
      {noFoundBooks && notFoundMessage}
      {foundBooks.length > 0 && !noFoundBooks && (
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
