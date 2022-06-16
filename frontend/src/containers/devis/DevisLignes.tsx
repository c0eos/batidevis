import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDevisLignesById, getOneDevisById, updateAllDevisLignesById } from "../../api/devis";
import { useAppSelector } from "../../utils/reduxHooks";
import { IDevis, IDevisLigne } from "../../utils/schemas";
import { DocumentLigneForm } from "../../components";

export default function DevisLignes() {
  const params = useParams();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);
  const devis = useAppSelector((state) => state.devis);

  const [currentDevis, setCurrentDevis] = useState<IDevis | undefined>();
  const [lignes, setLignes] = useState<IDevisLigne[]>([]);

  useEffect(() => {
    if (params.devisId && !currentDevis) {
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
    // update ligne order
    for (let i = 0; i < lignesdata.length; i++) {
      lignesdata[i].numLigne = i;
    }

    updateAllDevisLignesById(params.devisId, lignesdata, user.token)
      .then((lignesdata) => {
        setLignes(lignesdata);
        navigate(`/devis/${params.devisId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <DocumentLigneForm lignes={lignes} document={currentDevis} onSubmit={onSubmit} />
    </div>
  );
}
