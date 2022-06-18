import { useEffect, useState } from "react";
import {
  deleteOneUserById, getAllUsers, register, updateOneUserById,
} from "../api/user";
import { UserForm } from "../components";
import { useAppSelector } from "../utils/reduxHooks";
import { IUser } from "../utils/schemas";

export default function Settings() {
  const user = useAppSelector((state) => state.user);

  const [users, setUsers] = useState<IUser[]>([]);

  const refreshUsers = () => {
    getAllUsers(user.token)
      .then((users: IUser[]) => setUsers(users))
      .catch((error: any) => console.log(error));
  };

  useEffect(() => {
    if (user.isLoggedIn) {
      refreshUsers();
    }
  }, [user]);
  const onSubmitUserUpdate = (userdata: IUser) => {
    updateOneUserById(user.info.id, userdata, user.token)
      .catch((error) => console.log(error));
  };

  const onDeleteUser = (id: number | undefined) => {
    deleteOneUserById(id, user.token)
      .then(() => refreshUsers())
      .catch((error) => console.log(error));
  };

  const onSubmitUserAdd = (userdata: IUser) => {
    register(userdata, user.token)
      .then(() => {
        refreshUsers();
      })
      .catch((error: any) => console.log(error));
  };

  return (
    <div className="mx-4 lg:mx-0 my-4">
      <div
        className="max-w-md px-4 lg:px-8 py-4 mx-auto lg:max-w-2xl bg-white shadow rounded"
      >
        <h1 className="text-xl font-bold text-center">Paramètres</h1>

        <div className="grid grid-cols-1 pt-2 mt-2 border-t-2 border-stone-300 lg:grid-cols-3">
          <div className="mb-6">
            <h2 className="text-stone-800">Utilisateur actuel</h2>
            <p className="mt-2 text-sm italic text-stone-400">Changer l'adresse mail et/ou le mot de passe</p>
          </div>
          <div className="col-span-2 lg:ml-4">
            <UserForm onSubmit={onSubmitUserUpdate} user={user.info} />
          </div>
        </div>

        <div className="grid grid-cols-1 pt-2 mt-2 border-t-2 border-stone-300 lg:grid-cols-3">
          <div className="mb-6">
            <h2 className="text-stone-800">Utilisateurs</h2>
            <p className="mt-2 text-sm italic text-stone-400">Liste, ajoute et supprime les utilisateurs</p>
          </div>
          <div className="col-span-2 lg:ml-4">
            <h2 className="mt-4 mb-2 text-lg font-bold text-center">Liste des utilisateurs</h2>
            <table className="w-full">
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="even:bg-white odd:bg-stone-100">
                    <td>{u.email}</td>
                    <td>
                      {u.id !== user.info.id && (
                      <button type="button" title="Supprimer" onClick={() => onDeleteUser(u.id)}>
                        <i className="text-red-600 fa-solid fa-ban" />
                      </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2 className="mt-4 mb-2 text-lg font-bold text-center">Ajouter</h2>
            <UserForm onSubmit={onSubmitUserAdd} />
          </div>
        </div>
      </div>
    </div>
  );
}
