import { useNavigate } from "react-router-dom";

interface Props {
  type: string,
}

export default function ButtonAjout({ type }:Props) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/creation/${type}`);
  };

  return (
    <button
      type="button"
      className="absolute px-4 py-2 font-bold text-white bg-blue-500 rounded right-8 bottom-8 hover:bg-blue-700"
      onClick={onClick}
    >
      Ajouter
    </button>
  );
}
