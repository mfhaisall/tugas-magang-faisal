// src/DataTable.jsx
import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

// Import fungsi export
import { exportToExcel } from "../../../libs/exportExcel";
import { exportToPdf } from "../../../libs/exportPdf";

/**
 * Komponen DataTable yang dinamis dan bisa digunakan kembali.
 *
 * @param {object} props - Properti komponen.
 * @param {Array<object>} props.data - Array objek data yang akan ditampilkan di tabel.
 * @param {Array<object>} props.columnDefinitions - Definisi kolom untuk tabel (misalnya, dari columns.jsx).
 * @param {boolean} [props.enableActions=true] - Mengaktifkan/menonaktifkan kolom aksi.
 * @param {function} [props.onShow] - Callback saat tombol Show diklik. Menerima objek row.
 * @param {function} [props.onEdit] - Callback saat tombol Edit diklik. Menerima objek row.
 * @param {function} [props.onDelete] - Callback saat tombol Delete diklik. Menerima objek row.
 */
function DataTable({
  datas,
  columnDefinitions,
  enableActions = true,
  enableExport = true,
  enableColumnFilter = true,
  onShow,
  onEdit,
  onDelete,
}) {
  const [tableData, setTableData] = useState(datas); // Gunakan state internal untuk data yang bisa dimanipulasi (misal: delete)
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isColumnDropdownOpen, setIsColumnDropdownOpen] = useState(false); // Ubah nama state agar lebih jelas
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

  const columnDropdownRef = useRef(null); // Ubah nama ref
  const exportDropdownRef = useRef(null);

  // Sinkronkan data prop dengan state internal jika data berubah dari luar
  useEffect(() => {
    setTableData(datas);
  }, [datas]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        columnDropdownRef.current &&
        !columnDropdownRef.current.contains(event.target)
      ) {
        setIsColumnDropdownOpen(false);
      }
      if (
        exportDropdownRef.current &&
        !exportDropdownRef.current.contains(event.target)
      ) {
        setIsExportDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --- Fungsi Handler Aksi Internal ---
  // Fungsi ini dipanggil dari dalam komponen DataTable,
  // kemudian memicu callback yang diberikan melalui props.
  const handleShow = useCallback(
    (row) => {
      if (onShow) {
        onShow(row);
      } else {
        alert(`Menampilkan detail data: \n${JSON.stringify(row, null, 2)}`);
        console.log("Show data:", row);
      }
    },
    [onShow]
  );

  const handleEdit = useCallback(
    (row) => {
      if (onEdit) {
        onEdit(row);
      } else {
        alert(
          `Mengedit data dengan ID: ${row.id}\n(Fungsionalitas edit belum diimplementasikan sepenuhnya)`
        );
        console.log("Edit data:", row);
      }
    },
    [onEdit]
  );

  const handleDelete = useCallback(
    (row) => {
      if (onDelete) {
        onDelete(row);
      } else {
        if (
          window.confirm(
            `Apakah Anda yakin ingin menghapus data dengan ID: ${row.id}?`
          )
        ) {
          setTableData((prevData) =>
            prevData.filter((item) => item.id !== row.id)
          );
          alert(`Data dengan ID: ${row.id} berhasil dihapus!`);
          console.log("Delete data:", row);
        }
      }
    },
    [onDelete]
  );

  // Siapkan kolom dengan menambahkan kolom 'Actions' jika diaktifkan
  const columns = useMemo(() => {
    const baseColumns = Array.isArray(columnDefinitions)
      ? [...columnDefinitions]
      : [];
    const finalColumns = [...baseColumns];

    if (enableActions) {
      finalColumns.push({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleShow(row.original)}
              className="px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600"
            >
              Show
            </button>
            <button
              onClick={() => handleEdit(row.original)}
              className="px-2 py-1 bg-yellow-500 text-white rounded-md text-xs hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="px-2 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      });
    }
    return finalColumns;
  }, [columnDefinitions, enableActions, handleShow, handleEdit, handleDelete]); // Dependensi

  const table = useReactTable({
    data: tableData, // Gunakan state data internal
    columns,
    state: {
      globalFilter,
      sorting,
      columnVisibility,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  // --- Fungsi Handle Ekspor (Memanggil fungsi dari file terpisah) ---
  const handleExportExcelClick = () => {
    exportToExcel(table);
    setIsExportDropdownOpen(false);
  };

  const handleExportPdfClick = () => {
    exportToPdf(table);
    setIsExportDropdownOpen(false);
  };

  return (
    <div className="p-4 mx-auto max-w-6xl">
      {/* Judul dinamis */}
      {/* Search Bar dan Column Visibility/Export Controls */}
      <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Cari semua field..."
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full md:w-1/3"
        />
        {/* Tombol untuk mengatur visibilitas kolom dan ekspor */}
        {enableExport && (
          <div className="flex gap-4">
            {" "}
            {/* Container untuk kedua dropdown */}
            {/* Column Show/Hide Dropdown */}
            {enableColumnFilter && (
              <div className="relative" ref={columnDropdownRef}>
                <button
                  onClick={() => setIsColumnDropdownOpen(!isColumnDropdownOpen)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Kelola Kolom
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isColumnDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <ul
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {table.getAllLeafColumns().map((column) => (
                        <li key={column.id}>
                          <label className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center cursor-pointer">
                            <input
                              {...{
                                type: "checkbox",
                                checked: column.getIsVisible(),
                                onChange: column.getToggleVisibilityHandler(),
                              }}
                              className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out rounded border-gray-300 focus:ring-blue-500"
                            />{" "}
                            <span className="ml-2">{column.id}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {/* Export Dropdown */}
            <div className="relative" ref={exportDropdownRef}>
              <button
                onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Export
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isExportDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <ul
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="export-menu"
                  >
                    <li>
                      <button
                        onClick={handleExportExcelClick}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Export to Excel (Current View)
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleExportPdfClick}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Export to PDF (All Data)
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-6 py-3 text-xs text-center font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[
                          table
                            .getState()
                            .sorting.find((s) => s.id === header.column.id)
                            ?.desc
                            ? "desc"
                            : table
                                .getState()
                                .sorting.find((s) => s.id === header.column.id)
                            ? "asc"
                            : null
                        ] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Fitur Pagination */}
      <div className="flex items-center justify-between mt-4 space-x-2">
        <div className="flex space-x-1">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
          >
            {"<"}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
          >
            {">>"}
          </button>
        </div>

        <span className="flex items-center gap-1 text-sm text-gray-700">
          Page{" "}
          <strong className="font-semibold">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1 text-sm text-gray-700">
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default DataTable;
