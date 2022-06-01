import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllDevisLignesById, getOneDevisById } from "../../api/devis";
import { useAppSelector } from "../../utils/reduxHooks";
import { IDevis, IDevisLigne } from "../../utils/schemas";
import { DocumentLigne, DocumentLigneForm } from "../../components";

export default function DevisLignes() {
  const params = useParams();

  const user = useAppSelector((state) => state.user);
  const devis = useAppSelector((state) => state.devis);

  const [currentDevis, setCurrentDevis] = useState<IDevis | undefined>();
  const [lignes, setLignes] = useState<IDevisLigne[]>([]);

  useEffect(() => {
    if (params.devisId && !currentDevis) {
      console.log(params.devisId, devis.items.find((devisdata) => devisdata.id == params.devisId));
      setCurrentDevis(devis.items.find((devisdata) => devisdata.id == params.devisId));
    }
  }, [devis]);

  useEffect(() => {
    if (currentDevis && user.isLoggedIn) {
      getAllDevisLignesById(currentDevis.id, user.token)
        .then((lignesdata) => setLignes(lignesdata))
        .catch((err) => console.log(err));
    }
  }, [currentDevis, user]);

  const onSubmit = (lignesdata: IDevisLigne[]) => {
    console.log(lignesdata);
    console.log(lignes);
  };

  return (
    <div>
      <DocumentLigneForm lignes={lignes} onSubmit={onSubmit} />
    </div>
  );
}
