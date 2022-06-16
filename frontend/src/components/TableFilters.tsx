// @ts-nocheck
// A great library for fuzzy filtering/sorting items
// import matchSorter from "match-sorter";
import { useMemo } from "react";
import Fuse from "fuse.js";

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  return (
    <div>
      <span className="absolute pl-1 text-gray-500">
        <i className="fa-solid fa-magnifying-glass" />
      </span>
      <input
        className="w-full pl-6"
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
}) {
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
    filterValue, setFilter, preFilteredRows, id,
  },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = [true, false];

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      className="w-full px-2 bg-slate-100"
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

// function fuzzyTextFilterFn(rows, id, filterValue) {
//   return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
// }

// Let the table remove the filter if the string is empty
// fuzzyTextFilterFn.autoRemove = (val) => !val;

function fuzzyTextFilterFn(rows, id, filterValue) {
  const options = rows.map((row) => row.values);
  const fuse = new Fuse(rows, {
    useExtendedSearch: true,
    minMatchCharLength: 2,
    findAllMatches: true,
    keys: [`values.${id[0]}`],
  });
  const result = fuse.search(filterValue);

  return result.map((row) => row.item);
}
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

export {
  DefaultColumnFilter, SelectColumnFilter, fuzzyTextFilterFn, SelectBooleanColumnFilter,
};
