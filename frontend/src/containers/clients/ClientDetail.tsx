import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneClientById } from "../../api/clients";
import { useAppSelector } from "../../utils/reduxHooks";
import { ClientForm } from "../../components";

export default function ClientDetail() {
  const params = useParams();
  const user = useAppSelector((state) => state.user);
  const [client, setClient] = useState<any>({});

  useEffect(() => {
    if (user.isLoggedIn) {
      getOneClientById(params.clientId, user.token)
        .then((clientdata) => setClient(clientdata))
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div>
      <ClientForm client={client} />
    </div>
  );
}
