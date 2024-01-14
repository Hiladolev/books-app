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
      {/* dont forget to add condition - if the there are saved books */}
      <h2>Saved Books:</h2>
      <ul>
        {savedBooks.map((book) => (
          <li key={book.key}>
            <cite>{book.title}</cite> by {book.author_name}
            <img src="{book.cover_i}" alt={book.title}></img>
          </li>
        ))}
      </ul>
    </>
  );
}
