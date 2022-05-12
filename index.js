const express = require("express");
const app = express();
const port = 3001;

const persons = [
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

app.get("/", (req, res) => res.send("Hello Full Stack Open 2022!"));

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
