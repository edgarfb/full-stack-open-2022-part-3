require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const Person = require("./models/person");
// const addNewPerson = require("./models/person");

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

// FIXME: persons does not exist here ???
app.get("/info", (req, res) => {
  const date = new Date();
  const info = `<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`;
  res.send(info);
});

app.get("/api/persons", async (req, res, next) => {
  try {
    const persons = await Person.find({});
    return res.status(200).json(persons);
  } catch (error) {
    next(error);
  }
});

app.get("/api/persons/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const person = await Person.findById(id);
    return res.status(200).json(person);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const person = await Person.findByIdAndRemove(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.post("/api/persons", async (req, res, next) => {
  const { name, number } = req.body;
  //  FIXME:  is this still working??? I don't think so -- testing later

  // if (!name || !number || typeof number !== "number") {
  //   return res.status(400).json({ error: "Name or number missing" });
  // }
  // if (isNameTaken(name)) {
  //   return res.status(400).json({ error: "Name must be unique" });
  try {
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
  } catch (error) {
    next(error);
  }
  // }
});

// TODO: - add unknowEndPoint middleware

// TODO: - add error handler middleware

const errorHandler = (error, req, res, next) => {
  console.log(error);
  return res.status(500).send("Something broke!");
};
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
