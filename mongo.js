const mongoose = require("mongoose");
const args = process.argv;

if (args.length < 3) {
  console.log(
    "Please provide the oassword as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = args[2];
const name = args[3];
const number = args[4];

const url = `mongodb+srv://edgarfbFSO:${password}@cluster0.eoy65.mongodb.net/thePhonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

const Person = mongoose.model("Person", personSchema);

if (args.length < 4) {
  Person.find({})
    //   this just return {name: "name", number: "number"}
    .then((persons) =>
      persons.map((person) => {
        return {
          name: person.name,
          number: person.number,
        };
      })
    )
    .then((result) => {
      console.log("Phonebook:");
      result.forEach((person) => console.log(person.name, person.number));
      mongoose.connection.close();
    });
}
if (args.length >= 4 && args.length <= 5) {
  const person = new Person({
    name,
    number,
    date: new Date(),
  });
  person.save().then((result) => {
    console.log("Person saved!");
    console.log("result", result);
    mongoose.connection.close();
  });
}

if (args.length > 6) {
  console.log("to many arguments, just need a Password, Name and a Number");
  process.exit(1);
}
