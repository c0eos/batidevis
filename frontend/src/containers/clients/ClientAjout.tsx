import { useNavigate } from "react-router-dom";
import { ClientForm } from "../../components";
import { IClient } from "../../utils/schemas";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { createOneClient, getAllClients } from "../../api/clients";
import { loadClients } from "../../slices/clientsSlice";

export default function ClientAjout() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (clientdata: IClient) => {
    try {
      await createOneClient(clientdata, user.token);
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
      <ClientForm titre="Ajout d'un client" mode="add" onSubmit={onSubmit} />
    </div>
  );
}
