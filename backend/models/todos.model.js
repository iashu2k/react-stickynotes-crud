const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const taskSchema = new Schema(
  {
    heading: { type: String, required: true, unique: true },
    task: { type: String, required: true},
    user_id: {type: String, required:true}
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;