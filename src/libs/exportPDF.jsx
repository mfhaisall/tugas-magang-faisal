// src/exportPdf.js
import jsPDF from "jspdf";
import "jspdf-autotable";
import { autoTable } from "jspdf-autotable";

export const exportToPdf = (table, fileName = "data_table_all.pdf") => {
  const doc = new jsPDF();

  // Dapatkan data yang sudah difilter dan disortir, tapi ABAIKAN PAGINATION
  const dataToExport = table
    .getSortedRowModel()
    .rows.map((row) => row.original);

  // Filter hanya kolom yang terlihat di UI
  const visibleColumns = table
    .getAllLeafColumns()
    .filter((column) => column.getIsVisible());
  const headers = visibleColumns.map((column) => ({
    header: column.columnDef.header,
    dataKey: column.id,
  }));

  // Siapkan body tabel untuk PDF
  const body = dataToExport.map((row) => {
    const rowData = {};
    visibleColumns.forEach((column) => {
      const accessorKey = column.columnDef.accessorKey;
      if (accessorKey) {
        rowData[column.id] = row[accessorKey];
      } else if (column.id === "actions") {
        // Menangani kolom 'actions'
        rowData[column.id] = ""; // Biarkan kosong untuk kolom actions di export
      }
    });
    return rowData;
  });

  // Buat tabel PDF menggunakan jspdf-autotable
  autoTable(doc, {
    head: [headers.map((h) => h.header)],
    body: body.map((row) => headers.map((header) => row[header.dataKey])),
    startY: 20,
    headStyles: { fillColor: [200, 200, 200] },
    margin: { top: 10, left: 10, right: 10, bottom: 10 },
    styles: { fontSize: 8, cellPadding: 2, overflow: "linebreak" },
    columnStyles: {
      actions: { cellWidth: 50 }, // Sesuaikan lebar jika perlu
    },
  });

  // Simpan dan unduh file PDF
  doc.save(fileName);
};
