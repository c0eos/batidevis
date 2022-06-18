import { useMemo } from "react";
import { SelectBooleanColumnFilter, Table, ButtonAjout } from "../../components";
import { dateFormat, priceFormat } from "../../utils/formatters";
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
      <Table columns={columns} data={devis.items} title="Liste des devis" />
      <ButtonAjout type="devis" />
    </div>
  );
}
