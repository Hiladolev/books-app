import Home from "../pages/Home/Home";
import Header from "./Header/Header";

export default function Main() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <Home />
      </main>
      <footer></footer>
    </div>
  );
}
