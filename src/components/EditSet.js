import { useState } from "react";
import { uuid } from "..";
import { Form, redirect, useOutletContext } from "react-router-dom";

export default function EditSet() {
  const [sets, setSets] = useOutletContext();
  const [newCards, setNewCards] = useState([blankCard()]);
  const [formData, setFormData] = useState({
    title: "",
    cards: newCards,
    date: undefined,
    id: undefined
  });

  const cardInputs = newCards.map((card) => (
    <CardInput
      key={card.id}
      card={card}
      onCardChange={handleCardChange}
      // id={card.id}
      // def={card.def}
      // answer={card.answer}
      onDelete={() => handleDelete(card.id)}
      // onDefChange={() => handleDefChange(card.id)}
      // onAnswerChange={() => handleAnswerChange(card.id)}
    />
  ));

  function saveSets() {
    console.log(formData);
    setSets((sets) => [...sets, formData]);
  }

  function saveNewSet(e) {
    e.preventDefault();
    const newData = {
      ...formData,
      cards: newCards,
      created: Date.now(),
      id: uuid()
    };
    setFormData(newData);
    saveSets();
  }

  function createNew() {
    setNewCards((cards) => [...cards, blankCard()]);
  }

  function handleDelete(cardId) {
    setNewCards((cards) => cards.filter((card) => card.id !== cardId));
  }

  function handleCardChange(newCard) {
    setNewCards((cards) =>
      cards.map((card) => (card.id === newCard.id ? newCard : card))
    );
  }

  return (
    <Form method="post" onSubmit={saveNewSet}>
      <div>
        <label htmlFor="title-input">Set Title:</label>
        <input id="title-input" name="title"></input>
      </div>
      <ol>
        {cardInputs}
        <li>
          <button type="button" onClick={createNew}>
            Create new card
          </button>
        </li>
      </ol>
      <button type="submit">Save</button>
    </Form>
  );
}

function CardInput({ card, onCardChange, onDelete }) {
  const defId = `def${card.id}`;
  const answerId = `ans${card.id}`;

  function handleDefChange(e) {
    const newDef = e.target.value;
    onCardChange({ ...card, def: newDef });
  }

  function handleAnswerChange(e) {
    const newAnswer = e.target.value;
    onCardChange({ ...card, answer: newAnswer });
  }

  return (
    <li>
      <div>
        <label htmlFor={defId}>Definition:</label>
        <textarea
          id={defId}
          value={card.def}
          onChange={handleDefChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor={answerId}>Answer:</label>
        <textarea
          id={answerId}
          value={card.answer}
          onChange={handleAnswerChange}
        ></textarea>
      </div>
      <div>
        <button type="button" onClick={onDelete}>
          Delete this card
        </button>
      </div>
    </li>
  );
}

function blankCard() {
  return { id: uuid(), def: "", answer: "" };
}
