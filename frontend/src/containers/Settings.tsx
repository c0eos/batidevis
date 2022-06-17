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

  useEffect(() => {
    if (user.isLoggedIn) {
      refreshUsers();
    }
  }, [user]);

  const refreshUsers = () => {
    getAllUsers(user.token)
      .then((users: IUser[]) => setUsers(users))
      .catch((error: any) => console.log(error));
  };

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
    <div className="max-w-md px-8 py-4 mx-auto lg:max-w-2xl bg-slate-100">
      <h1 className="text-xl text-center">Paramètres</h1>

      <div className="grid grid-cols-1 pt-2 mt-2 border-t-2 lg:grid-cols-3">
        <div className="mb-6">
          <h2 className="text-slate-800">Utilisateur actuel</h2>
          <p className="mt-2 text-sm italic text-slate-600">Changer l'adresse mail et/ou le mot de passe</p>
        </div>
        <div className="col-span-2 lg:ml-4">
          <UserForm onSubmit={onSubmitUserUpdate} user={user.info} />
        </div>
      </div>

      <div className="grid grid-cols-1 pt-2 mt-2 border-t-2 lg:grid-cols-3">
        <div className="mb-6">
          <h2 className="text-slate-800">Utilisateurs</h2>
          <p className="mt-2 text-sm italic text-slate-600">Liste, ajoute et supprime les utilisateurs</p>
        </div>
        <div className="col-span-2 lg:ml-4">
          <h2 className="mt-4 mb-2 text-lg font-bold text-center">Liste des utilisateurs</h2>
          <table className="w-full">
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
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
  );
}
