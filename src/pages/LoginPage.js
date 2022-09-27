import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", {
        username,
        password,
      })
      .then(function (response) {
        // handle success
        console.log(response);
        setUsername("");
        setPassword("");
        localStorage.setItem("apps", JSON.stringify(response.data));
        navigate("/");
      })
      .catch(function (error) {
        // handle error
        setPassword("");
        alert(error.message);
      });
  };

  return (
    <div className="auth">
      <form onSubmit={handleSubmit}>
        <h1>Connectez vous</h1>
        <div>
          <label>Nom utilisateur</label>
          <input
            type="text"
            placeholder="Koffi..."
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button>Enregistrer</button>
        </div>
      </form>
    </div>
  );
}
