import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteOneDevisById, getAllDevis, getOneDevisById, updateOneDevisById,
} from "../../api/devis";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { DevisForm } from "../../components";
import { IClient, IDevis } from "../../utils/schemas";
import { loadDevis } from "../../slices/devisSlice";

export default function DevisDetail() {
  const params = useParams();
  const user = useAppSelector((state) => state.user);
  const clients = useAppSelector((state) => state.clients);
  const [devis, setDevis] = useState<IDevis|undefined>();
  const [client, setClient] = useState<IClient | undefined>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoggedIn) {
      getOneDevisById(params.devisId, user.token)
        .then((devisdata) => { setDevis(devisdata); return devisdata; })
        .then((devisdata) => {
          const clientdata = clients.items.find((client) => client.code === devisdata.codeClient);
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
      const data = await deleteOneDevisById(params.devisId, user.token);

      // mettre à jour la liste des devis
      const alldevisdata = await getAllDevis(user.token);
      dispatch(loadDevis(alldevisdata));
      navigate("/devis/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DevisForm devis={devis} titre="Modification d'un devis" mode="edit" onSubmit={onSubmit} onDelete={onDelete} />
    </div>
  );
}
