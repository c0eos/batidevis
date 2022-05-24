import { useMemo } from "react";
import { useAppSelector } from "../../utils/reduxHooks";
import { Table, SelectColumnFilter } from "../../components";

export default function ClientsList() {
  const clients = useAppSelector((state) => state.clients);

  const columns = useMemo(() => [
    { Header: "Code", accessor: "code" },
    { Header: "Nom", accessor: "nom" },
    { Header: "Téléphone", accessor: "telephone" },
    {
      Header: "CP", accessor: "codePostal",
    },
    { Header: "Ville", accessor: "ville", disableFilters: true },
  ], []);

  return (
    <div className="container max-w-7xl mx-auto">
      <h1 className="font-bold text-2xl text-center">Liste des clients</h1>
      <Table columns={columns} data={clients.items} />

    </div>
  );
}
