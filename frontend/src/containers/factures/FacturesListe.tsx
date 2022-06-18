import { useMemo } from "react";
import { Table } from "../../components";
import { useAppSelector } from "../../utils/reduxHooks";
import { dateFormat, priceFormat } from "../../utils/formatters";

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
      Header: "Total TTC",
      accessor: "totalTTC",
      width: 125,
      Cell: ({ value }: any) => (
        <p className="text-right">
          {priceFormat(value)}
          {" "}
          €
        </p>
      ),
      hideOnMobile: true,
    },
    {
      Header: "Édité le",
      accessor: "dateEdition",
      width: 125,
      Cell: ({ value }: any) => dateFormat(value),
      hideOnMobile: true,
    },
  ], []);

  return (
    <div>
      <Table columns={columns} data={factures.items} title="Liste des factures" />
    </div>
  );
}
