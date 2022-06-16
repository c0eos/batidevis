import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllFactures, getOneFactureById, updateOneFactureById } from "../../api/factures";
import { useAppSelector, useAppDispatch } from "../../utils/reduxHooks";
import { FactureForm } from "../../components";
import { loadFactures } from "../../slices/facturesSlice";
import { IFacture } from "../../utils/schemas";

export default function FactureDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  const [facture, setFacture] = useState<any>({});

  useEffect(() => {
    if (user.isLoggedIn) {
      getOneFactureById(params.factureId, user.token)
        .then((facturedata) => setFacture(facturedata))
        .catch((err) => console.log(err));
    }
  }, [user]);

  const onSubmit = async (facturedata: IFacture) => {
    try {
      const data = await updateOneFactureById(params.factureId, facturedata, user.token);
      setFacture(data);

      // mettre à jour la liste des factures
      const allfacturedata = await getAllFactures(user.token);
      dispatch(loadFactures(allfacturedata));
      navigate("/factures/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <FactureForm facture={facture} titre="Modification d'une facture" onSubmit={onSubmit} />
    </div>
  );
}
