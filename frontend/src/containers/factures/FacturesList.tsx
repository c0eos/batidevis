import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { Table, SelectColumnFilter } from "../../components";
import { loadFactures } from "../../slices/facturesSlice";
import { getAllFactures } from "../../api/factures";
import { priceFormat, dateFormat } from "../../utils/cellFormaters";

export default function FacturesList() {
  const factures = useAppSelector((state) => state.factures);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (factures.items.length === 0 && user.isLoggedIn) {
      getAllFactures(user.token).then((facturedata) => dispatch(loadFactures(facturedata)));
    }
  }, [user.isLoggedIn]);

  return (
    <div className="container max-w-7xl mx-auto">
      <h1 className="font-bold text-2xl text-center">Liste des factures</h1>
      <Table columns={columns} data={factures.items} />

    </div>
  );
}
