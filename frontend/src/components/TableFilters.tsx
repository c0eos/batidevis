// @ts-nocheck
// A great library for fuzzy filtering/sorting items
// import matchSorter from "match-sorter";
import { useMemo } from "react";
import Fuse from "fuse.js";

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, setFilter },
}:any) {
  return (
    <div>
      <span className="absolute pl-1 text-stone-500">
        <i className="fa-solid fa-magnifying-glass" />
      </span>
      <input
        className="w-full pl-6 bg-stone-50 border-[1px] rounded-sm"
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
      />
    </div>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: {
    filterValue, setFilter, preFilteredRows, id,
  },
}: any) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()].sort();
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function SelectBooleanColumnFilter({
  column: {
    filterValue, setFilter,
  },
}: any) {
  const options = [true, false];

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      className="w-full px-2 bg-stone-100"
    >
      <option value="">Tous</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option ? "Oui" : "Non"}
        </option>
      ))}
    </select>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  const fuse = new Fuse(rows, {
    useExtendedSearch: true,
    minMatchCharLength: 3,
    // findAllMatches: true,
    keys: [`values.${id[0]}`],
  });
  const result = fuse.search(filterValue);

  return result.map((row) => row.item);
}
fuzzyTextFilterFn.autoRemove = (val) => !val;

export {
  DefaultColumnFilter, SelectColumnFilter, fuzzyTextFilterFn, SelectBooleanColumnFilter,
};
