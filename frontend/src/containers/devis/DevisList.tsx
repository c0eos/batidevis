import { useEffect, useMemo } from "react";
import { getAllDevis } from "../../api/devis";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { loadDevis } from "../../slices/devisSlice";
import { Table, SelectColumnFilter } from "../../components";
import { dateFormat } from "../../utils/cellFormaters";

export default function DevisList() {
  const devis = useAppSelector((state) => state.devis);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const columns = useMemo(() => [
    { Header: "Code", accessor: "code" },
    {
      Header: "Date", accessor: "date", Cell: dateFormat,
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
    { Header: "Ville", accessor: "villeTravaux" },
    { Header: "Adresse", accessor: "adresseTravaux" },
    { Header: "Info", accessor: "info" },
  ], []);

  useEffect(() => {
    if (devis.items.length === 0 && user.isLoggedIn) {
      getAllDevis(user.token).then((devisdata) => dispatch(loadDevis(devisdata)));
    }
  }, [user.isLoggedIn]);

  return (
    <div className="container max-w-7xl mx-auto">
      <h1 className="font-bold text-2xl text-center">Liste des devis</h1>
      <Table columns={columns} data={devis.items} />

    </div>
  );
}
