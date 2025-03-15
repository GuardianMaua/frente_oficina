import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SecurePortal.css";

export default function SecurePortal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const predefinedUsername = "admin";
  const predefinedPassword = "password123";

  const handleLogin = () => {
    if (username === predefinedUsername && password === predefinedPassword) {
      alert("Flag: GUARDIAN{N3TWORK_M4STER}");
      navigate("/");  // Correto: usar React Router para navegação
    } else {
      setError("Login inválido");
      navigate("/login-failed");  // Correto: usar React Router para navegação
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Secure Portal</h1>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
