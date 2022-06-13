import { useMemo } from "react";
import { Table } from "../../components";
import { useAppSelector } from "../../utils/reduxHooks";
import { dateFormat, priceFormat } from "../../utils/cellFormaters";

export default function FacturesListe() {
  const factures = useAppSelector((state) => state.factures);

  const columns = useMemo(() => [
    {
      Header: "Code",
      accessor: "code",
      width: 125,
    },
    {
      Header: "Code Client",
      accessor: "codeClient",
      width: 125,
    },
    {
      Header: "Sujet",
      accessor: "sujet",
      width: 300,
      Cell: ({ value }:{value:string|null}) => {
        if (value === null) {
          return "";
        }
        return value.slice(0, 50);
      },
    },
    {
      Header: "Ville",
      accessor: "ville",
      width: 200,
      hideOnMobile: true,
    },
    {
      Header: "Adresse",
      accessor: "adresse",
      width: 200,
      hideOnMobile: true,
    },
    {
      Header: "Total HT",
      accessor: "totalHT",
      width: 125,
      Cell: priceFormat,
      hideOnMobile: true,
    },
    {
      Header: "Total TTC",
      accessor: "totalTTC",
      width: 125,
      Cell: priceFormat,
      hideOnMobile: true,
    },
    {
      Header: "Date",
      accessor: "dateEdition",
      width: 125,
      Cell: dateFormat,
      hideOnMobile: true,
    },
  ], []);

  return (
    <div className="mx-4 lg:mx-8">
      <h1 className="text-2xl font-bold text-center">Liste des factures</h1>
      <Table columns={columns} data={factures.items} />

    </div>
  );
}
