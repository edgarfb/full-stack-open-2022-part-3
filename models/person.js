const mongoose = require("mongoose");
const password = process.env.MONGO_PASS_CLUSTER;

const url = `mongodb+srv://edgarfbFSO:${password}@cluster0.eoy65.mongodb.net/thePhonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);

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

module.exports = Person;
