export default `
  // 模拟的假数据
const StudentsData = [
  {
    name: "John",
    id: "1",
  },
  {
    name: "Jane",
    id: "2",
  },
  {
    name: "Jack",
    id: "3",
  },
  {
    name: "Jill",
    id: "4",
  },
  {
    name: "Jenny",
    id: "5",
  },
];

function StudentCard(props) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-bold">ID：{props.id}</h1>
      <h1 className="text-xl font-bold">Name：{props.name}</h1>
    </div>
  );
}

export default function Students() {
  return (
    <div>
      <h1>Students</h1>
      {StudentsData.map((student) => {
        return (
          <StudentCard name={student.name} id={student.id} key={student.id} />
        );
      })}
    </div>
  );
}
`
