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

export const ClassTableColumns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
        field: "classname",
        headerName: "Class Name",
        flex: 1,
        cellClassName: "name-column--cell"
    },
    {
        field: "sectionname",
        headerName: "Section Name",
        flex: 1,
        cellClassName: "name-column--cell"
    },
    {
        field: "tuition",
        headerName: "Tuition Fee",
        flex: 1,
        cellClassName: "name-column--cell"
    }
];

export const StudentTableColumns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
        field: "matricule",
        headerName: "Matricule",
        flex: 1,
        cellClassName: "name-column--cell"
    },
    {
        field: "fullname",
        headerName: "Full Name",
        flex: 1,
        cellClassName: "name-column--cell"
    },
    {
        field: "sectionname",
        headerName: "Section",
        flex: 1,
        cellClassName: "name-column--cell"
    },
    {
        field: "classname",
        headerName: "Class",
        flex: 1,
        cellClassName: "name-column--cell"
    },
    {
        field: "dobformated",
        headerName: "Date of Birth",
        flex: 1,
        cellClassName: "name-column--cell"
    },
    {
        field: "pob",
        headerName: "Place of Birth",
        flex: 1,
        cellClassName: "name-column--cell"
    },
    {
        field: "nationality",
        headerName: "Nationality",
        flex: 1,
        cellClassName: "name-column--cell"
    },
    {
        field: "gender",
        headerName: "Gender",
        flex: 1,
        cellClassName: "name-column--cell"
    },
    {
        field: "parentname",
        headerName: "Parent Name",
        flex: 1,
        cellClassName: "name-column--cell"
    },
    {
        field: "parentnumber",
        headerName: "Parent Contact",
        flex: 1,
        cellClassName: "name-column--cell"
    }
];