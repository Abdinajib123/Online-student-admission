
import React, { useState, useEffect } from "react";

const DataTable = ({
  title,
  columns,
  data = [],
  onAddClick,
  showAddButton = true,
}) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (Array.isArray(data)) {
      const filtered = data.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      );
      setFilteredData(filtered);
      setCurrentPage(1);
    } else {
      setFilteredData([]);
    }
  }, [search, data]);

  const startIdx = (currentPage - 1) * entriesPerPage;
  const endIdx = startIdx + entriesPerPage;
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  return (
    <div className="p-4 bg-white text-gray-900 rounded-xl shadow-md w-full">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {showAddButton && onAddClick && (
          <button
            onClick={onAddClick}
            className="bg-[#03045E] text-white px-4 py-2 rounded-lg dark:bg-gray-800 flex items-center"
          >
            <img
              src="/chart-icons/Vector.png"
              alt="Add Icon"
              className="w-5 h-5 mr-2"
            />
            Add
          </button>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-sm">
          <label className="text-gray-700">Show</label>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="border border-gray-300 bg-white text-gray-900 rounded px-2 py-1"
          >
            {[5, 10, 25].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="text-gray-500">entries</span>
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 px-3 py-1 rounded-lg w-full sm:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#03045E] text-white">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={col.key || i}
                  className="px-4 py-2 uppercase text-xs font-medium"
                >
                  {col.label ?? ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(startIdx, endIdx).map((row, idx) => (
              <tr
                key={row._id || idx}
                className={idx % 2 === 0 ? "bg-white text-black" : "bg-gray-50"}
              >
                {columns.map((col, i) => (
                  <td key={col.key || i} className="px-4 py-2">
                    {col.render
                      ? col.render(row)
                      : col.key
                          .split(".")
                          .reduce((obj, key) => obj?.[key], row) ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-between items-center mt-4 text-sm text-gray-600 gap-4">
        <span>
          {filteredData.length === 0
            ? "0 entries"
            : `${startIdx + 1}–${Math.min(
                endIdx,
                filteredData.length
              )} of ${filteredData.length}`}
        </span>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 rounded bg-gray-300 hover:bg-gray-400 text-black disabled:bg-gray-200"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ‹
          </button>
          <span>{currentPage}</span>
          <button
            className="px-2 py-1 rounded bg-gray-300 hover:bg-gray-400 text-black disabled:bg-gray-200"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
