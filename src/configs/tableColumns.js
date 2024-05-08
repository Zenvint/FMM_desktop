export const UserTableColumns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
        cellClassName: "name-column--cell"
    },
    {
        field: "roles",
        headerName: "Roles",
        flex: 1,
        cellClassName: "name-column--cell"
    },
    {
        field: "active",
        headerName: "Active",
        flex: 1,
        cellClassName: "name-column--cell"
    },
];

export const SectionTableColumns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
        field: "sectionname",
        headerName: "Section Name",
        flex: 1,
        cellClassName: "name-column--cell"
    }
];