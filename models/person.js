const mongoose = require("mongoose");
const url = process.env.MONGO_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

// The db connection is always open?

// this could be an option --- I need to check it out
// const addNewPerson = (name, number) => {
//   const person = new Person({
//     name,
//     number,
//     date: new Date(),
//   });
//   person.save().then((result) => {
//     console.log("Person saved!");
//     console.log("result", result);
//     mongoose.connection.close();
//   });
// };

module.exports = Person;
