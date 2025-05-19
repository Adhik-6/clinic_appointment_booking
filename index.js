import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { bookAppointment, getAppointments, updateAppointmentCompleted, deleteAppointments, login } from './server/controllers.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptionsDelegate = function (req, callback) {
  const origin = req.header('Origin');
  let corsOptions;

  if (origin === 'http://127.0.0.1:5500') {
    // console.log("req.method:", req.method);
    corsOptions = req.method === 'POST' || req.method === 'OPTIONS' ? { origin: true, methods: ['POST', 'OPTIONS'] } : { origin: false };
  } else if (origin === 'http://localhost:5173') {
    // console.log("req from react");
    corsOptions = { origin: true, methods: ['GET', 'POST', 'OPTIONS'] };
  } else {
    corsOptions = { origin: false };
  }
  // console.log("CORS options:", corsOptions);
  callback(null, corsOptions);
};


// Middleware
app.use(express.json());
app.use(cors(corsOptionsDelegate));
// app.use(cors({
//   origin: ['http://127.0.0.1:5500', 'http://localhost:5173'],
//   methods: ["GET", "POST", "OPTIONS"], 
// }))

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Clinic Appointment Booking API');
});

app.post('/api/book-appointment', bookAppointment);
app.post('/api/login', login);
app.get('/api/get-appointments', getAppointments);
app.post('/api/update-appointment-completed', updateAppointmentCompleted);
app.post('/api/delete-appointments', deleteAppointments);

// Start the server
try {
  await mongoose.connect(process.env.MONGO_URI)
  app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
} catch (err) {
  console.error("Error connecting to MongoDB:", err);
  process.exit(1); // Exit the process with failure
}