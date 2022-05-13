const express = require("express");
const app = express();
const port = 3001;

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

app.use(express.json());
app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log("body", body);
  const person = {
    id: Math.floor(Math.random() * 100000),
    name: body.name,
    number: body.number,
  };

  console.log("person", person);
  persons = persons.concat(person);
  console.log("persons", person.name);
  res.json(person);
});

app.get("/", (req, res) => res.send("Hello Full Stack Open 2022!"));

app.get("/info", (req, res) => {
  const date = new Date();
  const info = `<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`;
  res.send(info);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    return res.status(200).json(person);
  } else {
    return res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  console.log("person", person);
  if (person) {
    persons = persons.filter((person) => person.id !== id);
    return res.status(204).end();
  } else {
    return res.status(204).end();
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
