require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const Person = require("./models/person");
const pata = "pata";

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

app.get("/info", async (req, res) => {
  const date = new Date();
  const persons = await Person.find({});
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

// I did it in a previous coding session
app.delete("/api/persons/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Person.findByIdAndRemove(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.post("/api/persons", async (req, res, next) => {
  const { name, number } = req.body;

  const person = new Person({
    name,
    number,
    date: new Date(),
  });
  person
    .save()
    .then((personSaved) => {
      console.log("here");
      res.status(200).json(personSaved);
    })
    .catch((error) => {
      console.log("here error", error);
      next(error);
    });
});

app.put("/api/persons/:id", async (req, res, next) => {
  const id = req.params.id;
  const { number } = req.body;
  // {runValidators: true} it is enable valdator here
  Person.findByIdAndUpdate(id, { number }, { runValidators: true })
    .then((updatedPerson) =>
      res.status(200).send({ message: "Data Updated", newData: updatedPerson })
    )
    .catch((error) => next(error));
});

// TODO: - add unknowEndPoint middleware

const errorHandler = (error, req, res, next) => {
  console.log("Error from Error Middleware", error);
  if (error.name === "CastError") {
    res.status(400).send({ error: error.message });
  }
  if (error.name === "ValidationError") {
    console.log("ValidationError");
    res.status(400).send({ error: error.message });
  }
  // return res.status(500).send("Something broke!")
};
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
