// import { DataGrid } from "@mui/x-data-grid";

// const DataTable = ({ columns, rows }) => {
//   return (
//     <div style={{ width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={7}
//         rowsPerPageOptions={[7, 14, 21]}
//         disableSelectionOnClick
//         sx={{
//           fontFamily: "'Inter', 'Roboto', sans-serif",
//           boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//           border: "none",
//           backgroundColor: "#ffffff",
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: "#D1D5DB", // Main page color
//             color: "#1F2937", // Sidebar color for text
//             fontWeight: 600,
//             fontSize: "0.75rem",
//             borderBottom: "1px solid #9CA3AF",
//           },
//           "& .MuiDataGrid-row": {
//             transition: "background-color 0.2s ease",
//             cursor: "pointer",
//             "&:hover": {
//               backgroundColor: "#E5E7EB", // Light hover
//             },
//             "&:nth-of-type(even)": {
//               backgroundColor: "#F3F4F6", // Zebra striping
//             },
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "1px solid #E5E7EB",
//             color: "#1F2937",
//             fontSize: "0.75rem",
//           },
//           "& .MuiDataGrid-cell:focus": {
//             outline: "none",
//           },
//           "& .MuiDataGrid-row.Mui-selected": {
//             backgroundColor: "#E5E7EB !important", // Gray selection
//             "&:hover": {
//               backgroundColor: "#D1D5DB !important", // Darker gray hover
//             },
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "1px solid #E5E7EB",
//             fontSize: "0.75rem",
//             fontWeight: 500,
//             color: "#1F2937", // Sidebar color for text
//           },
//           "& .MuiDataGrid-iconSeparator": {
//             display: "none",
//           },
//           "& .MuiDataGrid-sortIcon": {
//             color: "#1F2937", // Sidebar color
//           },
//           "& .MuiDataGrid-menuIcon button": {
//             color: "#1F2937", // Sidebar color
//           },
//           "& .MuiDataGrid-columnHeaderTitle": {
//             fontWeight: 600,
//           },
//           "& .MuiTablePagination-root": {
//             color: "#1F2937", // Sidebar color
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: "#ffffff",
//           },
//           "& .Mui-checked": {
//             color: "#1F2937 !important", // Checkbox color
//           },
//           "& .MuiCheckbox-root": {
//             color: "#9CA3AF", // Unchecked checkbox color
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default DataTable;





import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";

const DataTable = ({ columns, rows }) => {
  const theme = useTheme();

  // Enhanced columns with consistent alignment
  const processedColumns = columns.map(column => ({
    ...column,
    headerAlign: 'center',
    align: 'center',
    flex: column.flex || 1,
    headerClassName: '',
    cellClassName: '',
    renderCell: (params) => {
      // Default rendering if no custom renderCell provided
      if (!column.renderCell) {
        return (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-gray-800">{params.value}</span>
          </div>
        );
      }
      
      // Custom rendering with centered container
      return (
        <div className="w-full h-full flex items-center justify-center">
          {column.renderCell(params)}
        </div>
      );
    }
  }));

  return (
    <div style={{ 
      width: "100%",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)"
    }}>
      <DataGrid
        rows={rows}
        columns={processedColumns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
        disableColumnMenu
        autoHeight={false}
        sx={{
          fontFamily: "'Inter', 'Roboto', sans-serif",
          border: "none",
          '& .MuiDataGrid-main': {
            borderRadius: '8px',
            overflow: 'hidden',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.grey[800],
            fontWeight: 600,
            fontSize: "0.75rem",
            borderBottom: `1px solid ${theme.palette.grey[300]}`,
          },
          '& .MuiDataGrid-columnHeader': {
            padding: '0 16px',
            '&:focus, &:focus-within': {
              outline: 'none',
            },
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
            whiteSpace: 'normal',
            lineHeight: '1.2',
            textAlign: 'center',
          },
          '& .MuiDataGrid-row': {
            transition: "background-color 0.2s ease",
            cursor: "pointer",
            '&:hover': {
              backgroundColor: theme.palette.grey[50],
            },
            '&:nth-of-type(even)': {
              backgroundColor: theme.palette.grey[50],
            },
            '&.Mui-selected': {
              backgroundColor: `${theme.palette.grey[200]} !important`,
              '&:hover': {
                backgroundColor: `${theme.palette.grey[300]} !important`,
              },
            },
          },
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
            color: theme.palette.grey[800],
            fontSize: "0.75rem",
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:focus': {
              outline: 'none',
            },
            '& > div': { // Target the wrapper div we added in processedColumns
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: "#ffffff",
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: `1px solid ${theme.palette.grey[300]}`,
            fontSize: "0.75rem",
            fontWeight: 500,
            color: theme.palette.grey[800],
          },
          '& .MuiDataGrid-iconSeparator': {
            display: "none",
          },
          '& .MuiDataGrid-sortIcon': {
            color: theme.palette.grey[800],
          },
          '& .MuiDataGrid-menuIcon button': {
            color: theme.palette.grey[800],
          },
          '& .MuiTablePagination-root': {
            color: theme.palette.grey[800],
          },
          '& .MuiCheckbox-root': {
            color: theme.palette.grey[400],
            '&.Mui-checked': {
              color: `${theme.palette.primary.main} !important`,
            },
          },
          '& .MuiDataGrid-selectedRowCount': {
            fontSize: '0.75rem',
          },
          '& .MuiDataGrid-toolbarContainer': {
            padding: '8px 16px',
          },
        }}
        componentsProps={{
          pagination: {
            labelRowsPerPage: 'Rows per page:',
            sx: {
              '& .MuiTablePagination-selectLabel': {
                fontSize: '0.75rem',
              },
              '& .MuiTablePagination-displayedRows': {
                fontSize: '0.75rem',
              },
              '& .MuiInputBase-root': {
                fontSize: '0.75rem',
              },
            },
          },
        }}
        localeText={{
          noRowsLabel: 'No data available',
          footerRowSelected: count => `${count.toLocaleString()} row${count !== 1 ? 's' : ''} selected`,
        }}
      />
    </div>
  );
};

export default DataTable;
