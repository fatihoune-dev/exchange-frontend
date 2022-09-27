import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import UserFormPage from "./pages/UserFormPage";
import UsersPage from "./pages/UsersPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route
        path="/"
        element={
          <RequireAuth>
            <AppLayout />
          </RequireAuth>
        }
      >
        <Route path="" element={<Dashboard />}></Route>
        <Route path="users" element={<UsersPage />}></Route>
        <Route path="users/:id" element={<UserFormPage />}></Route>
        <Route path="users/add" element={<UserFormPage />}></Route>
      </Route>
    </Routes>
  );
}

function RequireAuth({ children }) {
  let auth = localStorage.getItem("apps");
  let location = useLocation();

  console.log("apps " + localStorage.getItem("apps"));

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
