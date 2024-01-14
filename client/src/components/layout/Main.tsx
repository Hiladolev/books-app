import Home from "../pages/Home/Home";

export default function Main() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
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
