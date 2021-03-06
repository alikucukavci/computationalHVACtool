const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
  title: String,
  description: String,
  file: Object,
  // files: {
  //   name: String,
  //   path: String,
  //   contentType: Schema.Types.Mixed
  // },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  Rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room"
    }
  ]
});




const Project = model("Project", projectSchema);

module.exports = Project;