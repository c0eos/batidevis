// @ts-nocheck
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useMemo } from "react";
import {
  useTable, usePagination, useFilters, useResizeColumns, useBlockLayout,
} from "react-table";
import { useNavigate } from "react-router-dom";
import { DefaultColumnFilter, fuzzyTextFilterFn } from "./TableFilters";

export default function Table({ columns, data, title }: any) {
  const navigate = useNavigate();

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
    filter: fuzzyTextFilterFn,
    minWidth: 30,
    width: 200,
    maxWidth: 400,
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
    toggleHideColumn,
    allColumns,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 25 },
    },
    useFilters,
    usePagination,
    // useFlexLayout,
    useBlockLayout,
    // useAbsoluteLayout,
    useResizeColumns,

  );

  useEffect(() => {
    const hideOnMobile = () => {
      allColumns.forEach((column) => {
        if (column.hideOnMobile) {
          toggleHideColumn(column.id, window.innerWidth < 768);
        }
      });
    };
    hideOnMobile();

    window.addEventListener("resize", hideOnMobile);
  }, []);

  return (
    <div className="mx-4 lg:mx-8">
      {title && <h1 className="text-2xl mt-2 lg:mt-4 mb-2 font-bold text-center">{title}</h1>}
      <div className="w-fit max-w-full mx-auto bg-white py-4 px-2 rounded shadow">
        <div className="mx-auto overflow-x-auto">
          <table {...getTableProps()} className="max-w-full mx-auto w-fit">
            <thead>
              {headerGroups.map((headerGroup: any) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
                    <th {...column.getHeaderProps()} className="align-top">
                      {column.render("Header")}
                      <div className="px-0.5">
                        {column.canFilter ? column.render("Filter") : null}

                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row: any) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="py-2 even:bg-white odd:bg-stone-100 hover:bg-stone-200 hover:rounded hover:cursor-pointer"
                    onDoubleClick={() => {
                      navigate(`${row.original.id}`);
                    }}
                  >
                    {row.cells.map((cell: any) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-4 overflow-hidden whitespace-nowrap"
                      >
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

        <div className="mx-auto mt-4 max-w-fit">
          <button
            type="button"
            title="Premi??re page"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-1 disabled:text-stone-300"
          >
            <i className="fa-solid fa-angles-left" />
          </button>
          <button
            type="button"
            title="Page pr??c??dente"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-1 disabled:text-stone-300"
          >
            <i className="fa-solid fa-angle-left" />
          </button>
          <span className="px-4">
            {`Page ${pageIndex + 1}/${pageOptions.length}`}
          </span>
          <button
            type="button"
            title="Page suivante"
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-1 disabled:text-stone-300"
          >
            <i className="fa-solid fa-angle-right" />
          </button>
          <button
            type="button"
            title="Derni??re page"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="px-1 disabled:text-stone-300"
          >
            <i className="fa-solid fa-angles-right" />
          </button>
        </div>

      </div>

    </div>
  );
}
