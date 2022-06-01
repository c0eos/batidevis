// @ts-nocheck
import { useState } from "react";
import Fuse from "fuse.js";

interface Props {
  options: any[];
  onSelect: (item: any) => void;
}

export default function Search({
  options,
  onSelect,
}: Props) {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const fuse = new Fuse(options, {
    useExtendedSearch: true,
    minMatchCharLength: 3,
    findAllMatches: true,
    keys: [
      "nom",
      "code",
    ],
  });

  const onChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
    if (e.target.value.length >= 3) {
      setResults(fuse.search(e.target.value));
    } else {
      setResults([]);
    }
  };

  const localOnSelect = (item) => {
    setResults([]);
    setValue("");
    onSelect(item);
  };

  return (
    <div className="relative">
      <div className="">
        <span className="absolute px-2 py-1">X</span>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full pl-6 pr-2 py-1"
        />
      </div>
      {results.length > 0 && (
      <ul className="absolute bg-white py-2 w-full">
        {results.map((option, index) => (
          <li
            key={index}
            onClick={() => localOnSelect(option.item)}
            className="hover:cursor-pointer hover:border-2 hover:rounded px-2"
          >
            {option.item.nom}
          </li>
        ))}
      </ul>
      )}
    </div>

  );
}
