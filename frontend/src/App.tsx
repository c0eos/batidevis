import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./containers/Header";
import Home from "./containers/Home";
import { Login, Logout } from "./containers/user";
import { ClientsList, ClientDetail } from "./containers/clients";
import RequireAuth from "./components/AuthProvider";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={(
            <RequireAuth>
              <Outlet />
            </RequireAuth>
          )}
        >
          <Route path="clients/">
            <Route index element={<ClientsList />} />
            <Route path=":clientId" element={<ClientDetail />} />
          </Route>

          <Route path="logout/" element={<Logout />} />

          <Route path="*" />

        </Route>
      </Routes>

    </div>
  );
}

export default App;
