const Name = ({ hee, handleDeleteP }) => {
  const del = "delete";
  return (
    <div>
      {hee.name} {hee.number}
      <button onClick={handleDeleteP}>{del}</button>
    </div>
  );
};

const Persons = ({ pson, filter, handleDeleteP }) => {
  return (
    <div>
      {pson
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((hehe) => (
          <Name
            key={hehe.id}
            hee={hehe}
            handleDeleteP={handleDeleteP(hehe.id, hehe.name)}
          />
        ))}
    </div>
  );
};

export default Persons;
