import { useMemo } from "react";
import { SelectColumnFilter, Table } from "../../components";
import { dateFormat } from "../../utils/cellFormaters";
import { useAppSelector } from "../../utils/reduxHooks";

export default function DevisListe() {
  const devis = useAppSelector((state) => state.devis);

  const columns = useMemo(() => [
    { Header: "Code", accessor: "code" },
    {
      Header: "Date", accessor: "dateEdition", Cell: dateFormat,
    },
    {
      Header: "État", accessor: "etat", Filter: SelectColumnFilter, filter: "equals",
    },
    { Header: "Code Client", accessor: "codeClient" },
    {
      Header: "Sujet",
      accessor: "sujet",
      Cell: ({ value }:{value:string|null}) => {
        if (value === null) {
          return "";
        }
        return value.slice(0, 50);
      },
    },
    { Header: "Ville", accessor: "ville" },
    { Header: "Adresse", accessor: "adresse" },
    { Header: "Info", accessor: "info" },
  ], []);

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold text-center">Liste des devis</h1>
      <Table columns={columns} data={devis.items} />

    </div>
  );
}
