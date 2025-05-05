export default `import LOGO from "../components/logo";
import Footer from "../components/footer";
import NavBar from "../components/NavBar";
export default function About() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <LOGO />
        <NavBar />
      </div>
      <div className="bg-gray-800 text-white text-center p-20">
        This is the about page
      </div>
      <Footer />
    </div>
  );
}`
