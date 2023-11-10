//first, require mongoose
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/examples")
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to Mongo", err));

//creating first model, the object passed as argument is a schema
const Cat = mongoose.model("Cat", { name: String });

//example (model (User, Product, Comment) --> collection (users, products, comments))

//creating an instance
const kitty = new Cat({ name: "Ironhacker" });

//save kitty to database
kitty
  .save()
  .then((newCat) => console.log("new cat"))
  .catch((err) => console.log("error"));

//save() is sending an insertOne command to the database
//sends info to DB, saves new document in said collection and it is async

//list all cats
//using static method find(); in mongoose async, receives two parameters

Cat.find({}, (err, cats) => {
  if (err) {
    console.log("error occurred getting cats from DB");
    return;
  }
  console.log("got all cats!");
  //cats is an array of Cat instances!! for instance see above
  cats.forEach((cat) => console.log(`--> cat: ${cat.name}`));
});

//mongooses find() sends find command to database

//Mongoose and promises
//promise.all --> takes array of promises as a parameter and returns a single promise

const Student = mongoose.model("Student", { firstName: String });
const City = mongoose.model("City", { name: String });

const promise1 = Student.insertMany([
  { firstName: "Alice" },
  { firstName: "Bob" },
]);
const promise2 = City.insertMany([
  { name: "Madrid" },
  { name: "Barcelona" },
  { name: "Paris" },
]);

//promise all
Promise.all([promise1, promise2])
  .then((values) => {
    console.log(values);
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
