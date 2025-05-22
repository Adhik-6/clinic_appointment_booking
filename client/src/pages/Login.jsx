import { useState } from "react";
import axios from "axios";
import { CircularSpinner } from "../components/index.components.js";

export const Login = ({ setAuthenticated }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      // const res = await axios.post("http://localhost:8000/api/login", {mail, password});
      // console.log("Response: ", res);
      let res = { data: {
          success: true,
        }}
      if (res.data?.success) {
        setSuccess(true);
        setError("");
        setAuthenticated(true);
        sessionStorage.setItem("isAuthenticated", true);
      } else {
        setError("Invalid email or password.");
        setSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="login-container">
      <h2>Admin Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{loading?<CircularSpinner color="white"/>:"Login"}</button>
        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-success">Login successful!</div>}
      </form>
    </div>
    </>
  );
};
