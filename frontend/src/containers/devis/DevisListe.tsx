import { useMemo } from "react";
import { SelectColumnFilter, SelectBooleanColumnFilter, Table } from "../../components";
import { dateFormat } from "../../utils/cellFormaters";
import { useAppSelector } from "../../utils/reduxHooks";

export default function DevisListe() {
  const devis = useAppSelector((state) => state.devis);

  const columns = useMemo(() => [
    {
      Header: "Facturé",
      accessor: "transFacture",
      width: 125,
      Cell: ({ value }: {value:Boolean}) => (value
        ? <span className="px-2 py-1 text-sm text-green-800 bg-green-100 rounded-full">facturé</span>
        : <span className="px-2 py-1 text-sm text-orange-800 bg-orange-100 rounded-full">non facturé</span>
      ),
      Filter: SelectBooleanColumnFilter,
      hideOnMobile: true,
    },
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
      Header: "Date",
      accessor: "dateEdition",
      width: 125,
      Cell: dateFormat,
      hideOnMobile: true,
    },
  ], []);

  return (
    <div className="mx-4 lg:mx-8">
      <h1 className="text-2xl font-bold text-center">Liste des devis</h1>
      <Table columns={columns} data={devis.items} />

    </div>
  );
}
