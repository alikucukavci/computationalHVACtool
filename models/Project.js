const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  title: String,
  description: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  Rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room"
    }
  ]
});

//test
const Project = model("Project", projectSchema);

module.exports = Project;