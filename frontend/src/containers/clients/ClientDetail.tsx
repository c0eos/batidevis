import { useParams } from "react-router-dom";

export default function ClientDetail() {
  const params = useParams();

  return (
    <div>
      <p>{params.clientId}</p>
    </div>
  );
}
