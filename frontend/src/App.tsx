import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./containers/Header";
import { Login, Logout } from "./containers/user";
import { RequireAuth } from "./components";
import { ClientsList, ClientDetail, ClientAjout } from "./containers/clients";
import { DevisList, DevisDetail } from "./containers/devis";
import { FacturesList, FactureDetail } from "./containers/factures";
import { AcomptesList, AcompteDetail } from "./containers/acomptes";

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
            <Route path=":devisId" element={<DevisDetail />} />
          </Route>

          <Route path="factures/">
            <Route index element={<FacturesList />} />
            <Route path=":factureId" element={<FactureDetail />} />
          </Route>

          <Route path="acomptes/">
            <Route index element={<AcomptesList />} />
            <Route path=":acompteId" element={<AcompteDetail />} />
          </Route>

          <Route path="creation/">
            <Route path="client" element={<ClientAjout />} />
          </Route>

          <Route path="logout/" element={<Logout />} />

          <Route path="*" />

        </Route>
      </Routes>

    </div>
  );
}

export default App;
