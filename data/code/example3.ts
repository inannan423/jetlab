export default `
  function Hello() {
  return <h1>Hello</h1>;
}

function World() {
  return <h1>World</h1>;
}

function Word() {
  return <div>
    <Hello />
    <World />
    </div>;
}

export default function App() {
  return <Word />;
}
`
