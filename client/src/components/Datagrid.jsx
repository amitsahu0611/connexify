/** @format */
import {DataGrid} from "@mui/x-data-grid";

const DataTable = ({columns, rows}) => {
  return (
    <div style={{height: 520, width: "100%"}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7, 14, 21]}
        disableSelectionOnClick
        sx={{
          fontFamily: "'Inter', 'Roboto', sans-serif",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          border: "none",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f7fa",
            color: "#333",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontSize: 13,
            borderBottom: "1px solid #e0e0e0",
            boxShadow: "inset 0 -1px 0 #e0e0e0",
          },
          "& .MuiDataGrid-row": {
            transition: "background-color 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#f0f4ff",
            },
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f0f0f0",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: "#d2e4ff !important",
            "&:hover": {
              backgroundColor: "#b3d1ff !important",
            },
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #e0e0e0",
            backgroundColor: "#f5f7fa",
            fontSize: 14,
            fontWeight: 500,
            color: "#555",
          },
          "& .MuiDataGrid-iconSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "#1976d2",
          },
          // Zebra striping
          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#fafafa",
          },
        }}
      />
    </div>
  );
};

export default DataTable;
