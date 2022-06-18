import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createOneDevis, getAllDevis } from "../../api/devis";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { DevisForm } from "../../components";
import { IDevis } from "../../utils/schemas";
import { loadDevis } from "../../slices/devisSlice";

export default function DevisAjout() {
  const user = useAppSelector((state) => state.user);
  const [devis, setDevis] = useState<IDevis | undefined>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (devisdata: IDevis) => {
    try {
      const data = await createOneDevis(devisdata, user.token);
      setDevis(data);
      // mettre à jour la liste des devis
      const alldevisdata = await getAllDevis(user.token);
      dispatch(loadDevis(alldevisdata));
      navigate(`/devis/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DevisForm devis={devis} titre="Ajout d'un devis" mode="add" onSubmit={onSubmit} />
    </div>
  );
}
