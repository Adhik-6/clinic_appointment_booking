import { useState, useEffect } from "react";
import checkMark from "./../assets/checkmark.svg";
import { CircularSpinner } from "../components/index.components.js";
import axios from "axios";
import toast from "react-hot-toast";

export const Contact = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isBooking, setIsBooking] = useState(true)
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const mailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let inputs = document.querySelectorAll('input'); // name, mail, Age, phone, date
  // console.log("inputs: ", inputs);
  let inputObj = {}

  useEffect(() => {
    const today = new Date();
    const min = today.toISOString().split('T')[0];
    
    const maxObj = new Date();
    maxObj.setDate(today.getDate() + 30);
    const max = maxObj.toISOString().split('T')[0];
    
    setMinDate(min);
    setMaxDate(max);
  }, []);

  async function submitDetails(e) {
    setIsLoading(true)
    e.preventDefault();
    // console.log("inputs: ", inputs); 
    if (!validateField()){
      setIsLoading(false)
      return;
    }

    inputObj.fullName = inputs[0].value.trim();
    inputObj.mail = inputs[1].value.trim();
    inputObj.age = inputs[2].valueAsNumber;
    inputObj.phoneNumber = inputs[3].valueAsNumber;
    inputObj.date = inputs[4].valueAsDate;

    try {
      // console.log("going to send req");
      // let res = await axios.post("http://localhost:8000/api/book-appointment", {inputObj});
      let res = { data: {success: true} }
      // setSampleData(prev => prev.push({ _id: `${Date.now()}`, name: inputObj.fullName, email: inputObj.mail, age: inputObj.age, phone: inputObj.phoneNumber, date: inputObj.date} ))
      // console.log("after sending req");
      if (res.data?.success) {
        toast.success("Appointment booked successfully");
        setIsBooking(false)
      } else {
        toast.error(res.data?.message || "Something went wrong. Try again.");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setIsLoading(false)
    }
  }

  function validateField() {

    //name
    if (inputs[0].value.trim().length < 3) {
      toast.error("Name is required and it must be at least 3 characters long");
      return false;
    }
    if (/\d/.test(inputs[0].value)) {
      toast.error("Name can't contain numbers");
      return false;
    }

    //mail
    if (inputs[1].value.trim() && !mailRegEx.test(inputs[1].value.trim())) {
      toast.error("Enter a valid Email");
      return false;
    }

    //Age
    if (
      inputs[2].valueAsNumber < 0 ||
      inputs[2].valueAsNumber > 150 ||
      inputs[2].value.toLowerCase().includes("e") ||
      inputs[2].value.includes("+") ||
      inputs[2].value.includes("-") ||
      inputs[2].value.includes(".")
    ) {
      toast.error("Enter a valid Age");
      return false;
    }

    // Phone
    if (
      inputs[3].value.length != 10 ||
      inputs[3].value.toLowerCase().includes("e") ||
      inputs[3].value.includes("+") ||
      inputs[3].value.includes("-") ||
      inputs[3].value.includes(".")
    ) {
      toast.error("Enter a valid Phone number");
      return false;
    }

    // Date
    if (inputs[4].valueAsDate < new Date().setHours(0, 0, 0, 0)) {
      console.log("inputs[4].valueAsDate: ", inputs[4].valueAsDate);
      console.log("Date.now(): ", Date.now());
      toast.error("You can't select a past date");
      return false;
    }

    // console.log(inputs);
    return true;
  }

  return (
    <>
      <section className="timingSection">
        <h3>Consulting Hours</h3>
        <hr />
        <div className="consultingHours">
          <div>
            <strong>Day</strong>
            <time dateTime="2024-01-01T16:00">Monday - Saturday</time>
            <time dateTime="2024-01-01T10:00">Sunday</time>
          </div>
          <div>
            <strong>Time</strong>
            <time dateTime="2024-01-01T13:00">10:00 AM - 1:00 PM</time>
            <time dateTime="2024-01-01T22:00">4:00 PM - 10:00 PM</time>
          </div>
        </div>
        <p>
          <span>*</span>For any queries related date & time call:{" "}
          <a href="tel:+911234567890">1234567890</a>
        </p>
      </section>

      {isBooking ? (
        <form id="form">
          <h3>Book Appointment</h3>
          <div>
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Jhon Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="jhondoe@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="age">Age *</label>
            <input
              type="number"
              name="age"
              id="age"
              placeholder="12"
              min="0"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number *</label>
            <input
              type="number"
              pattern="[0-9]{10}"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="1234567890"
              required
            />
          </div>
          <div>
            <label htmlFor="date">Date *</label>
            <input min={minDate} max={maxDate} type="date" name="date" id="date" required />
          </div>
          <div>
            <button onClick={(e) => submitDetails(e)} className="formSubmit">
              {isLoading?<CircularSpinner color="white"/>:"Book"}
            </button>
          </div>
        </form>
      ) : (
        <article className="successComponent">
          <section>
            <div>
              <img src={checkMark} alt="Check" />
            </div>
            <h4>Your appointment request has been received.</h4>
          </section>
        </article>
      )}


    </>
  );
};
