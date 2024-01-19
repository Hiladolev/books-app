type Book = {
  title: string;
  author_name: string;
  cover_i: number;
  key: string;
};
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
            <cite>{book.title}</cite> by {book.author_name}
            <img
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
              alt={book.title}
            ></img>
          </li>
        ))}
      </ul>
    </>
  );
}
