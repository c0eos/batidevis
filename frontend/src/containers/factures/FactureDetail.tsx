import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneFactureById } from "../../api/factures";
import { useAppSelector } from "../../utils/reduxHooks";
import { FactureForm } from "../../components";

export default function FactureDetail() {
  const params = useParams();
  const user = useAppSelector((state) => state.user);
  const [facture, setFacture] = useState<any>({});

  useEffect(() => {
    if (user.isLoggedIn) {
      getOneFactureById(params.factureId, user.token)
        .then((facturedata) => setFacture(facturedata))
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div>
      <FactureForm facture={facture} />
    </div>
  );
}
