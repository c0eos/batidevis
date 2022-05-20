import { useEffect, useMemo } from "react";
import { getAllAcomptes } from "../../api/acomptes";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { loadAcomptes } from "../../slices/acomptesSlice";
import { Table } from "../../components";
import { priceFormat } from "../../utils/cellFormaters";

export default function AcomptesList() {
  const acomptes = useAppSelector((state) => state.acomptes);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (acomptes.items.length === 0 && user.isLoggedIn) {
      getAllAcomptes(user.token).then((acomptesdata) => dispatch(loadAcomptes(acomptesdata)));
    }
  }, [user.isLoggedIn]);

  return (
    <div className="container max-w-7xl mx-auto">
      <h1 className="font-bold text-2xl text-center">Liste des acomptes</h1>
      <Table columns={columns} data={acomptes.items} />

    </div>
  );
}
