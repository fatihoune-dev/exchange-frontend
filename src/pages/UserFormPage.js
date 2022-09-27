import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function UserFormPage() {
  const { id } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getUser = () => {
    axios
      .get("http://localhost:5000/users/byid/" + id)
      .then(function (response) {
        // handle success
        setUsername(response.data.username);
        setPassword(response.data.password);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(username + " - " + password);
    if (!id) {
      axios
        .post("http://localhost:5000/users/create", {
          username,
          password,
        })
        .then(function (response) {
          // handle success
          alert("Enregistrement effectuée");
          console.log(response);
          setUsername("");
          setPassword("");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else {
      axios
        .put("http://localhost:5000/users/update/" + id, {
          username,
          password,
        })
        .then(function (response) {
          // handle success
          alert("Mise à jour effectuée");
          setUsername("");
          setPassword("");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  return (
    <div>
      <Link to="/users">Retour à la liste</Link>
      {!id && <h1>Creer un utilisateur</h1>}
      {id && <h1>Modifier un utilisateur</h1>}
      <form onSubmit={handleSubmit}>
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
