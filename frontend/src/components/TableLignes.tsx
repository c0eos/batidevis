// @ts-nocheck
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import { useMemo, useEffect, useState } from "react";
import {
  useTable, useResizeColumns, useBlockLayout,
} from "react-table";
import { useNavigate } from "react-router-dom";
import { InputCell } from "./TableCells";

export default function TableLignes({
  columns, data, register, errors, onRemove,
}: any) {
  const navigate = useNavigate();

  const defaultColumn = useMemo(() => ({
    Cell: InputCell,
    minWidth: 30,
    width: 200,
    maxWidth: 1000,
  }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      register,
      errors,
    },
    useBlockLayout,
    useResizeColumns,

  );

  return (
    <div>
      <div className="mx-auto overflow-x-auto">
        <table {...getTableProps()} className="max-w-full mx-auto w-fit">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="even:bg-white odd:bg-slate-50 hover:bg-slate-200 hover:rounded"
                >
                  {row.cells.map((cell) => <td {...cell.getCellProps()}>{cell.render("Cell")}</td>)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
