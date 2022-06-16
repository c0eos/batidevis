import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../utils/reduxHooks";
import { IFacture, IFactureLigne } from "../../utils/schemas";
import { DocumentLigneForm } from "../../components";
import { getAllFactureLignesById, updateAllFactureLignesById } from "../../api/factures";

export default function FactureLignes() {
  const params = useParams();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);
  const factures = useAppSelector((state) => state.factures);

  const [currentFacture, setCurrentFacture] = useState<IFacture | undefined>();
  const [lignes, setLignes] = useState<IFactureLigne[]>([]);

  useEffect(() => {
    if (params.factureId && !currentFacture) {
      setCurrentFacture(factures.items.find((document) => document.id == params.factureId));
    }
  }, [factures]);

  useEffect(() => {
    if (currentFacture && user.isLoggedIn) {
      getAllFactureLignesById(currentFacture.id, user.token)
        .then((lignesdata) => setLignes(lignesdata))
        .catch((err) => console.log(err));
    }
  }, [currentFacture, user]);

  const onSubmit = (lignesdata: IFactureLigne[]) => {
    // update ligne order
    for (let i = 0; i < lignesdata.length; i++) {
      lignesdata[i].numLigne = i;
    }

    updateAllFactureLignesById(params.factureId, lignesdata, user.token)
      .then((lignesdata) => {
        setLignes(lignesdata);
        navigate(`/factures/${params.factureId}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <DocumentLigneForm lignes={lignes} document={currentFacture} onSubmit={onSubmit} />
    </div>
  );
}
