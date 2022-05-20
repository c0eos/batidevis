import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneAcompteById } from "../../api/acomptes";
import { useAppSelector } from "../../utils/reduxHooks";
import { AcompteForm } from "../../components";

export default function ClientDetail() {
  const params = useParams();
  const user = useAppSelector((state) => state.user);
  const [acompte, setAcompte] = useState<any>({});

  useEffect(() => {
    if (user.isLoggedIn) {
      getOneAcompteById(params.acompteId, user.token)
        .then((acomptedata) => setAcompte(acomptedata))
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div>
      <AcompteForm acompte={acompte} />
    </div>
  );
}
