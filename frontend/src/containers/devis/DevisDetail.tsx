import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteOneDevisById, getAllDevis, getOneDevisById, updateOneDevisById,
} from "../../api/devis";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { DevisForm } from "../../components";
import { IClient, IDevis } from "../../utils/schemas";
import { loadDevis } from "../../slices/devisSlice";
import { createOneFactureFromDevisId, getAllFactures } from "../../api/factures";
import { loadFactures } from "../../slices/facturesSlice";

export default function DevisDetail() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);
  const clients = useAppSelector((state) => state.clients);
  const factures = useAppSelector((state) => state.factures);

  const [devis, setDevis] = useState<IDevis|undefined>();
  const [client, setClient] = useState<IClient | undefined>();

  useEffect(() => {
    if (user.isLoggedIn) {
      getOneDevisById(params.devisId, user.token)
        .then((devisdata) => { setDevis(devisdata); return devisdata; })
        .then((devisdata) => {
          const clientdata = clients.items.find((c) => c.code === devisdata.codeClient);
          setClient(clientdata);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const onSubmit = async (devisdata: IDevis) => {
    try {
      const data = await updateOneDevisById(params.devisId, devisdata, user.token);
      setDevis(data);
      // mettre à jour la liste des devis
      const alldevisdata = await getAllDevis(user.token);
      dispatch(loadDevis(alldevisdata));
      navigate("/devis/");
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      await deleteOneDevisById(params.devisId, user.token);

      // mettre à jour la liste des devis
      const alldevisdata = await getAllDevis(user.token);
      dispatch(loadDevis(alldevisdata));
      navigate("/devis/");
    } catch (error) {
      console.log(error);
    }
  };

  const onTransfertFacture = async () => {
    let facturedata = factures.items.find((f) => f.codeDevis === devis?.code);
    if (devis?.transFacture === false) {
      try {
        facturedata = await createOneFactureFromDevisId(params.devisId, user.token);

        // mettre à jour la liste des devis et des factures
        const alldevisdata = await getAllDevis(user.token);
        const allfacturesdata = await getAllFactures(user.token);
        dispatch(loadDevis(alldevisdata));
        dispatch(loadFactures(allfacturesdata));
      } catch (error) {
        console.log(error);
      }
    }

    if (facturedata) {
      navigate(`/factures/${facturedata.id}`);
    }
  };

  return (
    <div>
      <DevisForm
        devis={devis}
        titre="Modification d'un devis"
        mode="edit"
        onSubmit={onSubmit}
        onTransfertFacture={onTransfertFacture}
        onDelete={onDelete}
      />
    </div>
  );
}
