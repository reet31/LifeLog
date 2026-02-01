import { useState } from "react";
import axios from "axios";
import "./signup.css";

const Signup = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      username,
      email,
      password
    });
    console.log(res.data); // success message
    onClose(); // close modal
  } catch (err) {
    console.log(err.response?.data || err.message);
  }
};


  return (
    <div className="modal-overlay">
      <div className="modal">
        <button  className="closebtn"onClick={onClose}>✕</button>
        <h2>Signup</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
