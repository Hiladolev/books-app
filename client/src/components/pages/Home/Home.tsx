import BooksList from "./BooksList/BooksList";
import Form from "./Form/Form";
export default function Home() {
  const savedBooks = [
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
  return (
    <>
      <Form />
      {/* dont forget to add condition - if the there are saved books */}
      <BooksList savedBooks={savedBooks} />
    </>
  );
}
