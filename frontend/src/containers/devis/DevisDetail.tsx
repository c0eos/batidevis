import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneDevisById } from "../../api/devis";
import { useAppSelector } from "../../utils/reduxHooks";
import { DevisForm } from "../../components";

export default function DevisDetail() {
  const params = useParams();
  const user = useAppSelector((state) => state.user);
  const [devis, setDevis] = useState<any>({});

  useEffect(() => {
    if (user.isLoggedIn) {
      getOneDevisById(params.devisId, user.token)
        .then((devisdata) => setDevis(devisdata))
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div>
      <DevisForm devis={devis} />
    </div>
  );
}
