import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Book = {
  title: string;
  author_name: string[];
  cover_i: number;
  key: string;
};

export default function Form() {
  const searchEndpoint = "https://openlibrary.org/search.json?q=";
  const { register, handleSubmit } = useForm();
  const [foundBooks, setFoundBooks] = useState<Book[]>([]);
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
        const requiredProperties = response.data.docs.map(
          ({ title, author_name, cover_i, key }: Book) => ({
            title,
            ...author_name,
            cover_i,
            key,
          })
        );
        setFoundBooks(requiredProperties);
      });
  });

  return (
    <>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input type="text" placeholder="Title" {...register("title")} />
        <input
          type="text"
          placeholder="Author name"
          {...register("author_name")}
        />
        <input type="submit" value="Submit" />
      </form>
      {foundBooks.length > 0 && (
        <fieldset>
          <legend>Save your favorite books:</legend>
          {foundBooks.map((book: Book) => (
            <div key={book.key} style={{ textAlign: "start" }}>
              <input type="checkbox" id={book.key} name={book.title} />
              <label htmlFor={book.title}>{book.title}</label>
            </div>
          ))}
        </fieldset>
      )}
    </>
  );
}
