import { useState } from "react";
const Name = ({ hee }) => {
  return (
    <div>
      {hee.name} {hee.number}
    </div>
  );
};

const Persons = ({ pson, filter }) => {
  return (
    <div>
      {pson
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((hehe) => (
          <Name key={hehe.id} hee={hehe} />
        ))}
    </div>
  );
};

export default Persons;
