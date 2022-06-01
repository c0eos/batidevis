import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllDevis, getOneDevisById, updateOneDevisById } from "../../api/devis";
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
          console.log(devisdata, clientdata);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const onSubmit = async (devisdata: IDevis) => {
    console.log(devisdata);
    console.log(devis);
    try {
      const data = await updateOneDevisById(params.devisId, devisdata, user.token);
      setDevis(data);
      // mettre à jour la liste des devis
      const alldevisdata = await getAllDevis(user.token);
      dispatch(loadDevis(alldevisdata));
      // navigate("/devis/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="text-center mx-auto w-fit font-bold">
        <Link to="lignes">Contenu</Link>
      </div>
      <DevisForm devis={devis} titre="Modification d'un devis" mode="edit" onSubmit={onSubmit} />
    </div>
  );
}
