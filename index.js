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

// Check if a name arlready exists

const names = persons.map((person) => person.name.toLocaleLowerCase());
const isNameTaken = (name) => names.includes(name.toLocaleLowerCase());

// Check if a name arlready exists

app.use(express.json());

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number || typeof number !== "number") {
    return res.status(400).json({ error: "Name or number missing" });
  }
  if (isNameTaken(name)) {
    return res.status(400).json({ error: "Name must be unique" });
  }
  const person = {
    id: Math.floor(Math.random() * 100000),
    name,
    number,
  };

  persons = persons.concat(person);
  res.json(person);
});

app.get("/", (req, res) => {
  return res.send("Hello Full Stack Open 2022!");
});

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
