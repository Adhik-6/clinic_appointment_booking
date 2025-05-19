import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Fixed typo: use 'match' instead of 'RegExp'
  },
  age: {
    type: Number,
    required: true,
    max: 150,
    min: 0,
  },
  phone: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= new Date();
      },
      message: "Date must be in the future",
    },
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});


const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;