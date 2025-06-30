// src/exportExcel.js
import * as XLSX from "xlsx";

export const exportToExcel = (table, fileName = "data_table.xlsx") => {
  // Dapatkan data dari semua baris yang saat ini ditampilkan oleh tabel (setelah filtering, sorting, dan pagination)
  const allRows = table.getRowModel().rows.map((row) => row.original);

  // Filter hanya kolom yang terlihat
  const visibleColumns = table
    .getAllLeafColumns()
    .filter((column) => column.getIsVisible());
  const headers = visibleColumns.map((column) => column.columnDef.header);

  // Siapkan data untuk diekspor
  const exportData = allRows.map((row) => {
    const rowData = {};
    visibleColumns.forEach((column) => {
      const accessorKey = column.columnDef.accessorKey;
      // Hanya tambahkan data jika accessorKey ada
      if (accessorKey) {
        rowData[column.id] = row[accessorKey];
      }
    });
    return rowData;
  });

  // Buat lembar kerja Excel
  const ws = XLSX.utils.json_to_sheet(exportData);
  // Tambahkan header di baris pertama
  XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });

  // Buat workbook dan tambahkan lembar kerja
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data Table");

  // Tulis dan unduh file Excel
  XLSX.writeFile(wb, fileName);
};
