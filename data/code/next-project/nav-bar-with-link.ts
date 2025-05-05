export default `import LOGO from "./logo";
import Link from "next/link";
export default function NavBar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <LOGO />
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
}
`
