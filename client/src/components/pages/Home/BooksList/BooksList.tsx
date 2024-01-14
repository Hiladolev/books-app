export default function BooksList() {
  return (
    <>
      {/* dont forget to add condition - if the there are saved books */}
      <h2>Saved Books:</h2>
      <ul>
        <li>
          <cite>book's title</cite> by book's author
          <image>book's image</image>
        </li>
      </ul>
    </>
  );
}
