import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        onLoginSuccess();   // ✅ update global auth
        navigate("/main"); // ✅ redirect
        onClose();
      }

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="closebtn" onClick={onClose}>✕</button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
