


import { useState, useEffect, useMemo } from "react";

const Table = ({
  columns,
  data,
  itemsPerPage = 20,
  onRowClick = null,
  actions = null,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter and sort data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((item) =>
        columns.some((col) =>
          String(item[col.key] ?? "").toLowerCase().includes(term)
        )
      );
    }

    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal < bVal) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, sortConfig, columns]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const renderMobileCard = (item, globalIndex) => (
    <div
      key={globalIndex}
      className="bg-white border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-200"
      onClick={() => onRowClick?.(item)}
    >
      {columns.map((column, index) => (
        <div
          key={index}
          className={index === 0 ? "mb-3" : "mb-2 flex justify-between items-center"}
        >
          {index === 0 ? (
            <div className="font-normal text-blue-600">
              {column.render ? column.render(item, globalIndex) : item[column.key]}
            </div>
          ) : (
            <>
              <span className="text-xs text-gray-500">{column.label}:</span>
              <div className="text-xs">
                {column.render ? column.render(item, globalIndex) : item[column.key]}
              </div>
            </>
          )}
        </div>
      ))}
      {actions && (
        <div className="mt-3 pt-3 border-t flex justify-end">
          {actions(item)}
        </div>
      )}
    </div>
  );

  const renderPaginationButtons = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);

    return Array.from({ length: end - start + 1 }, (_, i) => {
      const page = start + i;
      return (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`relative inline-flex items-center px-4 py-2 border text-xs font-normal ${
            currentPage === page
              ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* Header: Search */}
      <div className="p-2 border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-sm font-semibold text-gray-800 mb-2 md:mb-0">
            {filteredData.length} {filteredData.length === 1 ? "item" : "items"}
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <svg
              className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Table or Cards */}
      {isMobile ? (
        <div className="p-4">
          {currentItems.length > 0 ? (
            currentItems.map((item, i) =>
              renderMobileCard(item, indexOfFirstItem + i + 1)
            )
          ) : (
            <div className="text-center py-8 text-gray-500">No data found</div>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-6 py-1 text-left text-xs font-normal text-gray-500 uppercase tracking-wider ${
                      col.sortable ? "cursor-pointer" : ""
                    }`}
                    onClick={() => col.sortable && requestSort(col.key)}
                  >
                    <div className="flex items-center">
                      {col.label}
                      {sortConfig.key === col.key && (
                        <span className="ml-1">
                          {sortConfig.direction === "ascending" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {actions && (
                  <th className="px-6 py-2 text-right text-xs font-normal text-gray-500 uppercase">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((item, i) => (
                  <tr
                    key={i}
                    className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-2 whitespace-nowrap">
                        {col.render
                          ? col.render(item, indexOfFirstItem + i + 1)
                          : item[col.key]}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-6 py-1 text-right">{actions(item)}</td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-700 mb-2 sm:mb-0">
            Showing <span className="font-normal">{indexOfFirstItem + 1}</span> to{" "}
            <span className="font-normal">
              {Math.min(indexOfLastItem, filteredData.length)}
            </span>{" "}
            of <span className="font-normal">{filteredData.length}</span> results
          </div>
          <div className="inline-flex items-center space-x-1">
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2 py-1 rounded border ${
                currentPage === 1 ? "text-gray-300" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Prev
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-2 py-1 rounded border ${
                currentPage === totalPages
                  ? "text-gray-300"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
