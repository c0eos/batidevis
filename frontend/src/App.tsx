import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./containers/Header";
import { Login, Logout } from "./containers/user";
import { RequireAuth } from "./components";
import { ClientsListe, ClientDetail, ClientAjout } from "./containers/clients";
import {
  DevisListe, DevisDetail, DevisAjout, DevisLignes,
} from "./containers/devis";
import { FacturesListe, FactureDetail, FactureLignes } from "./containers/factures";
import { AcomptesListe, AcompteDetail } from "./containers/acomptes";

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
            <Route index element={<ClientsListe />} />
            <Route path=":clientId" element={<ClientDetail />} />
          </Route>

          <Route path="devis/">
            <Route index element={<DevisListe />} />
            <Route path=":devisId">
              <Route index element={<DevisDetail />} />
              <Route path="lignes" element={<DevisLignes />} />
            </Route>
          </Route>

          <Route path="factures/">
            <Route index element={<FacturesListe />} />
            <Route path=":factureId">
              <Route index element={<FactureDetail />} />
              <Route path="lignes" element={<FactureLignes />} />
            </Route>
          </Route>

          <Route path="acomptes/">
            <Route index element={<AcomptesListe />} />
            <Route path=":acompteId" element={<AcompteDetail />} />
          </Route>

          <Route path="creation/">
            <Route path="client" element={<ClientAjout />} />
            <Route path="devis" element={<DevisAjout />} />
          </Route>

          <Route path="logout/" element={<Logout />} />

          <Route path="*" />

        </Route>
      </Routes>

    </div>
  );
}

export default App;
