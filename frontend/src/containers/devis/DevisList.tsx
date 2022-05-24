import { useMemo } from "react";
import { useAppSelector } from "../../utils/reduxHooks";
import { Table, SelectColumnFilter } from "../../components";
import { dateFormat } from "../../utils/cellFormaters";

export default function DevisList() {
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
    <div className="container max-w-7xl mx-auto">
      <h1 className="font-bold text-2xl text-center">Liste des devis</h1>
      <Table columns={columns} data={devis.items} />

    </div>
  );
}
