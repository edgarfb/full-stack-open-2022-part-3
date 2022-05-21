require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const Person = require("./models/person");
// const addNewPerson = require("./models/person");

console.log(Person);

// Check if a name arlready exists

// const names = persons.map((person) => person.name.toLocaleLowerCase());
const isNameTaken = (name) => names.includes(name.toLocaleLowerCase());

// Check if a name arlready exists
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
morgan.token("res-body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :res-body"
  )
);

app.get("/", (req, res) => {
  return res.send("Hello Full Stack Open 2022!");
});

app.get("/info", (req, res) => {
  const date = new Date();
  const info = `<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`;
  res.send(info);
});

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((people) => res.json(people))
    .catch((error) => console.log(error.message));
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

app.post("/api/persons", async (req, res) => {
  const { name, number } = req.body;
  // is this still working??? I don't think so -- testing later
  // if (!name || !number || typeof number !== "number") {
  //   return res.status(400).json({ error: "Name or number missing" });
  // }
  // if (isNameTaken(name)) {
  //   return res.status(400).json({ error: "Name must be unique" });
  // }
  const person = new Person({
    name,
    number,
    date: new Date(),
  });
  person.save().then((result) => {
    console.log("Person saved!");
    console.log("result", result);
  });

  res.json(person);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
