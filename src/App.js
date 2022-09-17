import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [id, setId] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  // Make a request for a user with a given ID

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get("http://localhost:5000/users/list")
      .then(function (response) {
        // handle success
        console.log(response);
        setUsers(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
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
          console.log(response);
          setId(null);
          setUsername("");
          setPassword("");
          getUsers();
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
          console.log(response);
          setId(null);
          setUsername("");
          setPassword("");
          getUsers();
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  const handleEdit = (e, userId) => {
    e.preventDefault();
    axios
      .get("http://localhost:5000/users/byid/" + userId)
      .then(function (response) {
        // handle success
        console.log(response);
        setId(response.data._id);
        setUsername(response.data.username);
        setPassword(response.data.password);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const handleDelete = (e, userId) => {
    e.preventDefault();
    if (window.confirm("êtes vous sûr de vouloir supprimer ?")) {
      axios
        .delete("http://localhost:5000/users/delete/" + userId)
        .then(function (response) {
          // handle success
          console.log(response);
          getUsers();
          alert(response.data.username + " a été supprimé avec succès");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  const toggleSelection = (e) => {
    console.log(e.target.checked);
    console.log(e.target.value);

    let isChecked = e.target.checked;
    if (isChecked) {
      // add value to selectedSelection
      // setTheArray(oldArray => [...oldArray, newElement]);
      setSelectedUsers((selectedUsers) => [...selectedUsers, e.target.value]);
    } else {
      setSelectedUsers(selectedUsers.filter((item) => item !== e.target.value));
    }
  };

  const doWithList = (e) => {
    e.preventDefault();
    alert(selectedUsers);
  };

  return (
    <div>
      <h1>Utilisateurs</h1>

      <div>
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

      <div>
        {selectedUsers.length > 0 && (
          <div>
            <button onClick={doWithList}>Supprimer la selection</button>
          </div>
        )}
      </div>
      <table>
        <tr>
          <th>ID</th>
          <th>Nom Utilisateur</th>
          <th>Actions</th>
        </tr>
        {users.map((user) => (
          <tr key={user._id}>
            <td>
              <input
                type="checkbox"
                value={user._id}
                onChange={toggleSelection}
              />
            </td>
            <td>{user.username}</td>
            <td>
              <button onClick={(e) => handleEdit(e, user._id)}>Modifier</button>
              <button onClick={(e) => handleDelete(e, user._id)}>
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
