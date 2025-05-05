export default `import LOGO from "../components/logo";
import Footer from "../components/footer";
import Article from "../components/article";
import NavBar from "../components/NavBar";
export default function Home() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <LOGO />
        <NavBar />
      </div>
      <Article />
      <Footer />
    </div>
  );
}
`
