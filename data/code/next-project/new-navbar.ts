export default `import LOGO from "./logo";
export default function NavBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <LOGO />
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
  );
}
`
