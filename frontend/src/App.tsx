import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./containers/Header";
import { Login, Logout } from "./containers/user";
import { ClientsList, ClientDetail } from "./containers/clients";
import { RequireAuth } from "./components";
import { DevisList, DevisDetail } from "./containers/devis";
import { FacturesList, FactureDetail } from "./containers/factures";

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

          <Route path="devis/">
            <Route index element={<DevisList />} />
            <Route path=":clientId" element={<DevisDetail />} />
          </Route>

          <Route path="factures/">
            <Route index element={<FacturesList />} />
            <Route path=":clientId" element={<FactureDetail />} />
          </Route>

          <Route path="devis/">
            <Route index element={<DevisList />} />
            <Route path=":clientId" element={<DevisDetail />} />
          </Route>

          <Route path="logout/" element={<Logout />} />

          <Route path="*" />

        </Route>
      </Routes>

    </div>
  );
}

export default App;
