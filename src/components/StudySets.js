import { Link, useOutletContext } from "react-router-dom";
import { uuid } from "../index.js";

export default function StudySets() {
  return (
    <>
      <NewSetButton />
      <Table />
    </>
  );
}

function Table() {
  const [sets, setSets] = useOutletContext();

  const rows = sets.map((set) => (
    <tr key={set.id}>
      <td>{set.title}</td>
      <td>{set.created.toDateString()}</td>
      <td>{set.cards.length}</td>
    </tr>
  ));

  return (
    <table className="study-set-table">
      <tbody>
        <tr>
          <th>Title</th>
          <th>Created</th>
          <th>Size</th>
        </tr>
        {rows}
      </tbody>
    </table>
  );
}

function NewSetButton() {
  return (
    <Link to="/new-set">
      <button>
        <b>+</b> New Study Set
      </button>
    </Link>
  );
}
