// @ts-nocheck
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from "react";
import { useTable, usePagination, useFilters } from "react-table";
import { DefaultColumnFilter } from "./TableFilters";

export default function Table({ columns, data }: any) {
  const filterTypes = useMemo(() => ({
    text: (rows, id, filterValue) => rows.filter((row) => {
      const rowValue = row.values[id];
      return rowValue !== undefined
        ? String(rowValue)
          .toLowerCase()
          .startsWith(String(filterValue).toLowerCase())
        : true;
    }),
  }));

  const defaultColumn = useMemo(() => ({
    Filter: DefaultColumnFilter,
  }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable({
    columns, data, defaultColumn, filterTypes, initialState: { pageIndex: 0, pageSize: 25 },
  }, useFilters, usePagination);

  return (
    <div>
      <div className="max-w-7xl mx-auto overflow-x-auto">
        <table {...getTableProps()} className="max-w-full mx-auto">
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th {...column.getHeaderProps()} className="align-top">
                    {column.render("Header")}
                    <div>{column.canFilter ? column.render("Filter") : null}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any, i: Number) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="even:bg-white odd:bg-slate-100" onDoubleClick={(e) => console.log(row.original)}>
                  {row.cells.map((cell: any) => (
                    <td {...cell.getCellProps()} className="overflow-hidden whitespace-nowrap">
                      { cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* pagination */}

      <div className="mx-auto max-w-fit mt-4 bg-slate-50">
        <button
          type="button"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="bg-slate-200 px-2 mr-1 disabled:text-slate-400"
        >
          {"<<"}
        </button>
        <button
          type="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-slate-200 px-2 mr-1 disabled:text-slate-400"
        >
          {"<"}
        </button>
        <span className="mr-1">
          {`Page ${pageIndex + 1}/${pageOptions.length}`}
        </span>
        <button
          type="button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-slate-200 px-2 mr-1 disabled:text-slate-400"
        >
          {">"}
        </button>
        <button
          type="button"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="bg-slate-200 px-2 mr-1 disabled:text-slate-400"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
