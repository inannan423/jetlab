export default `import LOGO from "../../components/logo";
import Footer from "../../components/footer";
import NavBar from "../../components/NavBar";
import style from "./index.module.css";
export default function About() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <LOGO />
        <NavBar />
      </div>
      <div className={style.container}>
       This is the new about page
      </div>
      <Footer />
    </div>
  );
}
`
