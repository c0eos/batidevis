import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../utils/reduxHooks";
import { checkToken } from "../api/user";
import { login } from "../slices/userSlice";
import { getAllClients } from "../api/clients";
import { loadClients } from "../slices/clientsSlice";
import { getAllDevis } from "../api/devis";
import { loadDevis } from "../slices/devisSlice";
import { getAllAcomptes } from "../api/acomptes";
import { loadAcomptes } from "../slices/acomptesSlice";
import { getAllFactures } from "../api/factures";
import { loadFactures } from "../slices/facturesSlice";

function AuthProvider({ children }: {children: JSX.Element}) {
  // charges les données
  const user = useAppSelector((state) => state.user);
  const clients = useAppSelector((state) => state.clients);
  const devis = useAppSelector((state) => state.devis);
  const factures = useAppSelector((state) => state.factures);
  const acomptes = useAppSelector((state) => state.acomptes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.isLoggedIn && clients.items.length === 0) {
      getAllClients(user.token)
        .then((clientsdata) => dispatch(loadClients(clientsdata)));
    }

    if (user.isLoggedIn && devis.items.length === 0) {
      getAllDevis(user.token)
        .then((devisdata) => dispatch(loadDevis(devisdata)));
    }

    if (user.isLoggedIn && factures.items.length === 0) {
      getAllFactures(user.token)
        .then((facturedata) => dispatch(loadFactures(facturedata)));
    }

    if (user.isLoggedIn && acomptes.items.length === 0) {
      getAllAcomptes(user.token)
        .then((acomptesdata) => dispatch(loadAcomptes(acomptesdata)));
    }
  }, [user.isLoggedIn]);

  if (!user.isLoggedIn) {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return (<Navigate to="/login" />);
    }
    checkToken(token)
      .then((userdata) => dispatch(login({ info: userdata, token })))
      .catch((error) => console.log(error));
  }

  return children;
}

export default AuthProvider;
