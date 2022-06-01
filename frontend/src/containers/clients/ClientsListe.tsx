import { useMemo } from "react";
import { SelectColumnFilter, Table } from "../../components";
import { useAppSelector } from "../../utils/reduxHooks";

export default function ClientsListe() {
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
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold text-center">Liste des clients</h1>
      <Table columns={columns} data={clients.items} />

    </div>
  );
}
