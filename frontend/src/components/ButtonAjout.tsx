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
      className="button-add"
      onClick={onClick}
    >
      Ajouter
    </button>
  );
}
