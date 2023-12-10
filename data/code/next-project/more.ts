export default `import LOGO from "../components/logo";
import Footer from "../components/footer";
import NavBar from "../components/NavBar";
export default function More() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <LOGO />
        <NavBar />
      </div>
      <div>
       This is the more page
      </div>
      <Footer />
    </div>
  );
}
`
