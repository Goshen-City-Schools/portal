import React, { useMemo } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Box,
  useStyleConfig,
} from "@chakra-ui/react";

const DataTable = ({ columns, data, fullWidthColumns }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  const customStyles = useStyleConfig("Table"); // Get Chakra UI table styles

  return (
    <Box>
      <Table
        {...getTableProps()}
        className="custom-table"
        sx={{
          ...customStyles, // Apply default Chakra UI table styles
        }}
      >
        <Thead bg={"neutral.300"} whiteSpace={"nowrap"}>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  width={
                    fullWidthColumns?.includes(column.Header)
                      ? "100%"
                      : "max-content"
                  }
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()} fontSize={"sm"} whiteSpace={"nowrap"}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    width={
                      fullWidthColumns?.includes(cell.column.Header)
                        ? "100%"
                        : "max-content"
                    }
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex
        className="pagination"
        gap={4}
        mt={4}
        mx={"auto"}
        width={"max-content"}
      >
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
          </strong>{" "}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </Flex>
    </Box>
  );
};

export default DataTable;
