import { useMemo } from "react";
import { Table } from "../../components";
import { useAppSelector } from "../../utils/reduxHooks";
import { dateFormat, priceFormat } from "../../utils/cellFormaters";

export default function FacturesListe() {
  const factures = useAppSelector((state) => state.factures);

  const columns = useMemo(() => [
    { Header: "Code", accessor: "code" },
    {
      Header: "Date", accessor: "date", Cell: dateFormat,
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
    { Header: "Ville", accessor: "villeTravaux" },
    { Header: "Adresse", accessor: "adresseTravaux" },
    { Header: "Total HT", accessor: "totalHT", Cell: priceFormat },
    { Header: "Total TTC", accessor: "totalTTC", Cell: priceFormat },
  ], []);

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold text-center">Liste des factures</h1>
      <Table columns={columns} data={factures.items} />

    </div>
  );
}
