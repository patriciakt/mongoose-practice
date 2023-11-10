const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create user schema
const userSchema = new Schema(
  {
    name: { type: String },
    password: { type: String },
    job: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
