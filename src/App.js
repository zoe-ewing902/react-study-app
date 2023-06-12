import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { uuid } from "../index.js";

export default function Home() {
  const [studySets, setStudySets] = useState([
    {
      id: uuid(),
      title: "Test Set 1",
      created: new Date(Date.now()),
      cards: []
    },
    {
      id: uuid(),
      title: "Test Set 2",
      created: new Date(Date.now()),
      cards: [{ id: uuid(), def: "2 + 2", answer: "4" }]
    }
  ]);
  return (
    <>
      <Header />
      <Outlet context={[studySets, setStudySets]} />
    </>
  );
}

function Header() {
  return (
    <header>
      <Link to={`/`}>
        <h1>SuperStudy</h1>
      </Link>
    </header>
  );
}
