const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  collegeName: { type: String, required: true },
  phone: { type: String, required: true },
  teachers: [
    {
      name: String,
      email: String,
      subject: String,
      phone: String,
      password: String,
      classes: [
        {
          className: String,
          students: [
            {
              name: String,
              email: String,
              rollNumber: String,
              phone: String,
            },
          ],
          createdAt: { type: Date, default: Date.now },
        },
      ],
      createdAt: { type: Date, default: Date.now },
    },
  ],
  students: [
    {
      name: String,
      email: String,
      course: String,
      rollNumber: String,
      phone: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Player', // Reference to the Player model
    }
  ],
});

module.exports = mongoose.model("Admin", AdminSchema);
