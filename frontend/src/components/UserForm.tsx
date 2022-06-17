import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IUser, UserSchema } from "../utils/schemas";

interface Props {
    onSubmit: (userdata: IUser) => void,
    user?: IUser
    title?: string
}

export default function UserForm({
  onSubmit,
  user,
  title,
}: Props) {
  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm({
    defaultValues: user,
    mode: "onSubmit",
    resolver: yupResolver(UserSchema),
  });

  useEffect(() => {
    reset(user);
  }, [user]);

  const onError = (err: any) => {
    console.log(err);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="pb-4 mx-auto ">
      {title && <h1 className="py-4 text-2xl font-bold text-center">{title}</h1>}
      {errors?.email && (
      <p
        className="text-red-600"
      >
        {errors.email?.message}
      </p>
      )}
      <input
        type="email"
        placeholder="Email"
        className="block w-full px-2 py-1"
        {...register("email" as never)}
      />
      {errors?.password && (
      <p
        className="text-red-600"
      >
        {errors.password?.message}
      </p>
      )}
      <input
        type="password"
        placeholder="Mot de passe"
        className="block w-full px-2 py-1 mt-2"
        {...register("password" as never)}
      />
      <button type="submit" className="block w-full py-1 mt-4 bg-slate-300">Envoyer</button>
    </form>
  );
}
