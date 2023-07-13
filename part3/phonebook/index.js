const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
morgan.token("body", (request, response) =>
  request.method === "POST" ? JSON.stringify(request.body) : ""
);

app.use(
  morgan((tokens, request, response) =>
    [
      tokens.method(request, response),
      tokens.url(request, response),
      tokens.status(request, response),
      tokens.res(request, response, "content-length"),
      "-",
      tokens["response-time"](request, response),
      "ms",
      tokens.body(request, response),
    ].join("")
  )
);
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const generatedId = () => Math.floor(Math.random() * 100000 + 1);
app.get("/api/persons", (resquest, response) => {
  response.json(persons);
});
app.get("/info", (resquest, response) => {
  const responseText = `
  <p>Phonebook has info for ${persons.length} person</p>
  
 <p> ${new Date()}</p>
    `;
  response.send(responseText);
});
app.get("/api/persons/:id", (resquest, response) => {
  const id = Number(resquest.params.id);
  const person = persons.find((person) => id === person.id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const id = generatedId();
  if (!request.body.number) {
    return response.status(400).json({
      error: " number is missing",
    });
  }
  const foundp = persons.find((person) => person.name === request.body.name);
  if (foundp) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id,
    name: request.body.name,
    number: request.body.number,
  };
  persons = persons.concat(person);
  response.json(person);
});
app.delete("/api/persons/:id", (resquest, response) => {
  const id = Number(resquest.params.id);
  persons = persons.filter((person) => id !== person.id);
  response.status(204).end();
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
