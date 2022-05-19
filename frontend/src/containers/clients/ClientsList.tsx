import { useEffect, useMemo } from "react";
import { getAllClients } from "../../api/clients";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { loadClients } from "../../slices/clientsSlice";
import { Table, SelectColumnFilter } from "../../components";

export default function ClientsList() {
  const clients = useAppSelector((state) => state.clients);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const columns = useMemo(() => [
    { Header: "Code", accessor: "code" },
    { Header: "Nom", accessor: "nom" },
    { Header: "Téléphone", accessor: "telephone" },
    {
      Header: "CP", accessor: "codePostal", Filter: SelectColumnFilter, filter: "equals",
    },
    { Header: "Ville", accessor: "ville", disableFilters: true },
  ], []);

  useEffect(() => {
    if (clients.items.length === 0 && user.isLoggedIn) {
      getAllClients(user.token).then((clientsdata) => dispatch(loadClients(clientsdata)));
    }
  }, [user.isLoggedIn]);

  return (
    <div className="container max-w-7xl mx-auto">
      <h1 className="font-bold text-2xl text-center">Liste des clients</h1>
      <Table columns={columns} data={clients.items} />

    </div>
  );
}
