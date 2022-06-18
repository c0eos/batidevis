import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getOneClientById, updateOneClientById, getAllClients, deleteOneClientById,
} from "../../api/clients";
import { useAppSelector, useAppDispatch } from "../../utils/reduxHooks";
import { ClientForm } from "../../components";
import { IClient } from "../../utils/schemas";
import { loadClients } from "../../slices/clientsSlice";

export default function ClientDetail() {
  const params = useParams();
  const user = useAppSelector((state) => state.user);
  const [client, setClient] = useState<IClient | undefined>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoggedIn) {
      getOneClientById(params.clientId, user.token)
        .then((clientdata) => setClient(clientdata))
        .catch((err) => console.log(err));
    }
  }, [user]);

  const onSubmit = async (clientdata: IClient) => {
    try {
      const data = await updateOneClientById(params.clientId, clientdata, user.token);
      setClient(data);

      // mettre à jour la liste des clients
      const clientsdata = await getAllClients(user.token);
      dispatch(loadClients(clientsdata));
      navigate("/clients/");
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    try {
      await deleteOneClientById(params.clientId, user.token);

      // mettre à jour la liste des clients
      const clientsdata = await getAllClients(user.token);
      dispatch(loadClients(clientsdata));
      navigate("/clients/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ClientForm titre="Modification d'un client" client={client} mode="edit" onSubmit={onSubmit} onDelete={onDelete} />
    </div>
  );
}
