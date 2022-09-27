import React from "react";
import { Link } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import { FiUsers } from "react-icons/fi";

export default function AppLayout() {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("apps");
    console.log(localStorage.getItem("apps"));
    navigate("/");
  };
  return (
    <div className="flex">
      <div className="bg-gray-200 h-screen p-2 w-[200px] flex flex-col">
        <div className=" flex flex-col flex-[1]">
          <Link className="px-4 py-2 hover:bg-gray-100" to="/">
            Xchange
          </Link>
          <Link
            className="px-4 py-2 flex items-center space-x-3 hover:bg-gray-100"
            to="/users"
          >
            <FiUsers />
            <span>Utilisateurs</span>
          </Link>
          <Link className="px-4 py-2 hover:bg-gray-100" to="/users">
            Transactions
          </Link>
        </div>
        <div>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      </div>
      <div className="p-2 flex-[1]">
        <Outlet />
      </div>
    </div>
  );
}
