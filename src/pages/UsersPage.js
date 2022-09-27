import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiSearch, FiTrash2, FiEdit2 } from "react-icons/fi";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const getUsers = (page, query) => {
    axios
      .get(
        "http://localhost:5000/users/paginate?page=" +
          page +
          "&keyword=" +
          query
      )
      .then(function (response) {
        // handle success
        console.log(response);
        setUsers(response.data.users);
        setPage(parseInt(response.data.page));
        setPages(parseInt(response.data.pages));
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
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
          getUsers(page, null);
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

  const handleSearch = (search) => {
    getUsers(page, search);
  };

  useEffect(() => {
    getUsers(page, null);
  }, [page]);

  return (
    <div className="max-w-6xl mx-auto md:px-4 py-4">
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-2xl font-bold">Utilisateurs</h1>
        <Link className="px-4 py-2 border rounded-md" to="/users/add">
          Nouveau utilisateurs
        </Link>
      </div>
      <div>
        {selectedUsers.length > 0 && (
          <div>
            <button onClick={doWithList}>Supprimer la selection</button>
          </div>
        )}
      </div>

      <div className="flex mt-5">
        <div className="border px-4 rounded-full my-4 flex items-center space-x-4">
          <FiSearch />
          <input
            className="outline-none py-2"
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Rechercher..."
          />
        </div>
      </div>

      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="py-3 px-6">
                ID
              </th>
              <th scope="col" class="py-3 px-6">
                Nom d'utilisateurs
              </th>
              <th scope="col" class="py-3 px-6">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user._id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td class="py-4 px-6">
                  <input
                    type="checkbox"
                    value={user._id}
                    onChange={toggleSelection}
                  />
                </td>
                <td
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.username}
                </td>
                <td class="py-4 px-6 text-right">
                  <div className="flex items-end justify-end space-x-3">
                    <Link
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                      to={`/users/${user._id}`}
                    >
                      <FiEdit2 className="w-6 h-6" />
                    </Link>
                    <button onClick={(e) => handleDelete(e, user._id)}>
                      <FiTrash2 className="w-6 h-6" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages && (
        <div>
          {[...Array(pages)].map((p, i) => (
            <button key={i} onClick={(e) => setPage(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
