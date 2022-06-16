import { useMemo } from "react";
import { useAppSelector } from "../../utils/reduxHooks";
import { Table } from "../../components";
import { priceFormat } from "../../utils/formatters";

export default function AcomptesListe() {
  const acomptes = useAppSelector((state) => state.acomptes);

  const columns = useMemo(() => [
    { Header: "Code", accessor: "codeAcompte" },
    {
      Header: "Date", accessor: "date", Cell: ({ value }:{value:string}) => new Date(value).toLocaleDateString(),
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
    { Header: "Total HT", accessor: "totalHT", Cell: priceFormat },
    { Header: "Total TTC", accessor: "totalTTC", Cell: priceFormat },
  ], []);

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold text-center">Liste des acomptes</h1>
      <Table columns={columns} data={acomptes.items} />

    </div>
  );
}
