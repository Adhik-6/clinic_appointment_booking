import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import Appointment from "./models.js";
import dotenv from 'dotenv';
dotenv.config();

const { EMAIL_ADMIN, EMAIL_APP_PASSWORD } = process.env;


// Send email
const sendEmail = async (dbRes) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_ADMIN,
      pass: EMAIL_APP_PASSWORD
    }
  });

  const formattedDate = new Date(dbRes.date).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  
  try {
    const info = await transporter.sendMail({
      from: EMAIL_ADMIN,
      to: dbRes.email,
      subject: "VK Bone and Joint Clinic Appointment",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;"><br/>
        <h2>Appointment Confirmation</h2><br/>
        <p>Dear ${dbRes.name || 'Patient'},</p><br/>
        <p>Your appointment at <strong>VK Bone and Joint Clinic</strong> has been successfully booked ✅.</p><br/>
        <p><strong>Date:</strong> ${formattedDate}</p><br/>
        <p>Ref id: ${dbRes._id}</p><br/>
        <p>Thank you!</p><br/>
      </div>
      `,
  });
    console.log("Email sent:", info.response);
  } catch (error) {
    console.log("Error sending mail:", error);
  }
};


export const login = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const result = await Appointment.findOne({ email: mail });
    // console.log("Result: ", req.body);
    if (!result) return res.status(401).json({ success: false, message: "Invalid email" });
    if (!result.toObject().password) return res.status(401).json({ success: false, message: "Not an admin" });
    if(! await bcrypt.compare(password, result.toObject().password)) return res.status(401).json({ success: false, message: "Invalid password" });
    // console.log("Login successful");
    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ success: false, message: "Error during login" });
  }
}

export const bookAppointment = async (req, res) => {
  try {
    const { inputObj } = req.body;
    // console.log("Input: ", inputObj);
    const dbRes = await Appointment.create({name: inputObj.fullName, email: inputObj.mail, age: inputObj.age, phone: inputObj.phoneNumber, date: inputObj.date});
    if(inputObj.mail) sendEmail(dbRes);
    res.status(200).json({ success: true, message: "Appointment booked successfully", dbRes });
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ success: false, message: "Error booking appointment" });
  }
}

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ _id: { $ne: "68286e30eb603cadd00a26ff" } }).sort({ date: 1 , createdAt: 1 });
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ success: false, message: "No appointments found" });
    }
    res.status(200).json({ success:true, message: "Appointments fetched successfully", appointments});
  } catch (err) {
    console.error("Error fetching appointments:", err);
    res.status(500).json({ success: false, message: "Error fetching appointments" });
  }
}

export const updateAppointmentCompleted = async (req, res) => {
  try {
    const { id, isCompleted } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(id, { completed: isCompleted }, { new: true });
    // console.log("req body: ", req.body);
    // console.log("Appointment: ", appointment);
    if (!appointment) return res.status(404).json({ success: false, message: "Appointment not found" });
    return res.status(200).json({ success: true, message: "Appointment updated successfully" });
  } catch (err) {
    console.error("Error updating appointment:", err);
    return res.status(500).json({ success: false, message: "Error updating appointment" });
  }
}

export const deleteAppointments = async (req, res) => {
  try {
    const { months } = req.body;
    const monthsNum = Number(months);

    if (!monthsNum || monthsNum <= 0 || monthsNum > 12) {
      return res.status(400).json({ success: false, message: "Invalid number of months" });
    }

    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - monthsNum);

    // console.log("Cutoff date:", cutoffDate);

    const result = await Appointment.deleteMany({ date: { $lt: cutoffDate } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "No appointments found to delete" });
    }

    res.status(200).json({ success: true, message: "Appointments deleted successfully" });

  } catch (err) {
    console.error("Error deleting appointments:", err);
    res.status(500).json({ success: false, message: "Error deleting appointments" });
  }
}
