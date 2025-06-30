import React, { useCallback } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import DataTable from "../../../components/tables/DataTable/index";
import Button from "../../../components/ui/button/Button";
import { PlusIcon } from "../../../icons";
// import { getColumns } from "./columns";
import { initialData } from "./data";

const Registration = () => {
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "age",
      header: "Age",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "city",
      header: "City",
      cell: (info) => info.getValue(),
    },
  ];

  // --- Fungsi Handler Aksi ---
  const handleShow = useCallback((row) => {
    // Hapus anotasi tipe Person
    alert(`Menampilkan detail data: \n${JSON.stringify(row, null, 2)}`);
    console.log("Show data:", row);
  }, []);

  const handleEdit = useCallback((row) => {
    // Hapus anotasi tipe Person
    alert(
      `Mengedit data dengan ID: ${row.id}\n(Fungsionalitas edit belum diimplementasikan sepenuhnya)`
    );
    console.log("Edit data:", row);
    // Di sini Anda biasanya akan mengarahkan ke halaman edit
    // atau membuka modal/form untuk mengedit data.
  }, []);

  const handleDelete = useCallback((row) => {
    // Hapus anotasi tipe Person
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus data dengan ID: ${row.id}?`
      )
    ) {
      setData((prevData) => prevData.filter((item) => item.id !== row.id));
      alert(`Data dengan ID: ${row.id} berhasil dihapus!`);
      console.log("Delete data:", row);
    }
  }, []);

  const ActionFuture = () => {
    return (
      <div className="flex items-center gap-2">
        <Button size="sm" variant="info" endIcon={<PlusIcon />}>
          Add New
        </Button>
      </div>
    );
  };

  return (
    <>
     
      <div className="space-y-2">
        <ComponentCard
          title="Semua peserta"
          desc=""
          child={<ActionFuture />}
        >
          {/* {initialData} */}
          <DataTable
            datas={initialData}
            columnDefinitions={columns}
            enableActions={true}
            enableExport={true}
            enableColumnFilter={true}
            onShow={handleShow}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default Registration;
