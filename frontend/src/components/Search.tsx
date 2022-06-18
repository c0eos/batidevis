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
        <span className="absolute pl-1 mt-1 text-stone-500 ">
          <i className="fa-solid fa-magnifying-glass" />
        </span>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full py-1 pl-6 pr-2 border-[1px] rounded-sm bg-stone-50"
        />
      </div>
      {results.length > 0 && (
      <ul className="absolute w-full py-2 bg-white shadow rounded-b">
        {results.map((option, index) => (
          <li
            key={index}
            onClick={() => localOnSelect(option.item)}
            className="px-2 hover:cursor-pointer hover:border-2 border-stone-200 hover:rounded"
          >
            {option.item.nom}
          </li>
        ))}
      </ul>
      )}
    </div>

  );
}
