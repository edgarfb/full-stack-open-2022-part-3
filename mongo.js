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
const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

const Note = mongoose.model("Note", noteSchema);

if (args.length < 4) {
  Note.find({})
    //   this just return {name: "name", number: "number"}
    .then((notes) =>
      notes.map((note) => {
        return {
          name: note.name,
          number: note.number,
        };
      })
    )
    .then((result) => {
      console.log("Phonebook:");
      result.forEach((note) => console.log(note.name, note.number));
      mongoose.connection.close();
    });
}
if (args.length >= 4 && args.length <= 5) {
  const note = new Note({
    name,
    number,
    date: new Date(),
  });
  note.save().then((result) => {
    console.log("note saved!");
    console.log("result", result);
    mongoose.connection.close();
  });
}

if (args.length > 6) {
  console.log("to many arguments, just need a Password, Name and a Number");
  process.exit(1);
}
