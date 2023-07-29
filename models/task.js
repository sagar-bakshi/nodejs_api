import mongoose, { Schema, model } from "mongoose";

const schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    required: true,
    unique: true,
  },

  isComplted: {
    type: Boolean,
    default: false,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = model("Task", schema);

export default User;
