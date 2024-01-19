import Home from "../pages/Home/Home";

export default function Main() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <header></header>
      <main>
        <Home />
      </main>
      <footer></footer>
    </div>
  );
}
