import { useMemo } from "react";
import { ButtonAjout, SelectColumnFilter, Table } from "../../components";
import { useAppSelector } from "../../utils/reduxHooks";

export default function ClientsListe() {
  const clients = useAppSelector((state) => state.clients);

  const columns = useMemo(() => [
    {
      Header: "Code",
      accessor: "code",
      width: 125,
    },
    {
      Header: "Nom",
      accessor: "nom",
      width: 250,
    },
    {
      Header: "Téléphone",
      accessor: "telephone",
      width: 150,
      hideOnMobile: true,
    },
    {
      Header: "CP",
      accessor: "codePostal",
      width: 100,
      hideOnMobile: true,
    },
    {
      Header: "Ville",
      accessor: "ville",
      hideOnMobile: true,
      width: 200,
    },
  ], []);

  return (
    <div className="mx-4 lg:mx-8">
      <h1 className="text-2xl font-bold text-center">Liste des clients</h1>
      <Table columns={columns} data={clients.items} />

      <ButtonAjout type="client" />

    </div>
  );
}
