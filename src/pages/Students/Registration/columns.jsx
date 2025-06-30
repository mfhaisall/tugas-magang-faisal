export const getColumns = [
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
