/** @format */
import {DataGrid} from "@mui/x-data-grid";

const DataTable = ({columns, rows}) => {
  return (
    <div style={{height: 520, width: "100%"}}>
      <DataGrid
        rows={rows}
        columns={columns} // Corrected from column to columns
        pageSize={7}
        rowsPerPageOptions={[7, 14, 21]}
        disableSelectionOnClick
        sx={{
          fontFamily: "'Recursive', monospace",
          boxShadow: 2,
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
    </div>
  );
};

export default DataTable;
