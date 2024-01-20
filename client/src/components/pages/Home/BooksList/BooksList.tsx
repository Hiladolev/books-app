import Book from "../../../types/Book";
import "./BooksList.css";
interface BooksProps {
  savedBooks: Book[];
}
export default function BooksList({ savedBooks }: BooksProps) {
  return (
    <>
      <h2>Saved Books:</h2>
      <ul>
        {savedBooks.map((book) => (
          <li key={book.key}>
            <cite>{book.title}</cite>
            <span>By {book.author_name}</span>
            <img
              src={
                book.cover_i === 0
                  ? undefined
                  : `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
              }
              alt={book.cover_i === 0 ? "No Cover" : book.title}
            ></img>
          </li>
        ))}
      </ul>
    </>
  );
}
