const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/examples");

//when successfully connected
mongoose.connection.on("connected", () => console.log("mongoose default"));

//connection throws error?
mongoose.connection.on("error", () => console.log("error"));

//disconnected
mongoose.connection.on("disconnected", () => console.log("disconnected"));

//if node process ends, close mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
