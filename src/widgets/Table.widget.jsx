import { useTable, usePagination, useSortBy } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  useStyleConfig,
  useMediaQuery,
  Button,
} from "@chakra-ui/react";
import ReusableBadge from "../components/ReusableBadge";

const DataTable = ({ columns, data, fullWidthColumns, customPageSize }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

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
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize ? customPageSize : 20,
      },
    },
    useSortBy,
    usePagination
  );

  const customStyles = useStyleConfig("Table");

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <Box overflowX="auto">
      {" "}
      {/* Add this to enable horizontal scrolling on small screens */}
      <Table
        {...getTableProps()}
        className="custom-table"
        sx={{
          ...customStyles,
        }}
      >
        <Thead bg={"white"} whiteSpace={"nowrap"}>
          {headerGroups.map((headerGroup, index) => (
            <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  width={
                    fullWidthColumns?.includes(column.Header)
                      ? "100%"
                      : "max-content"
                  }
                  style={{
                    display:
                      isMobile && column.mobileHidden ? "none" : "table-cell",
                  }}
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

        <Tbody
          mb={{ base: 12 }}
          {...getTableBodyProps()}
          fontSize={"sm"}
          whiteSpace={"nowrap"}
        >
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <Td
                    key={index}
                    {...cell.getCellProps()}
                    width={
                      fullWidthColumns?.includes(cell.column.Header)
                        ? "100%"
                        : "max-content"
                    }
                    style={{
                      display:
                        isMobile && cell.column.mobileHidden
                          ? "none"
                          : "table-cell",
                    }}
                  >
                    {(cell.column.id === "approvalStatus") |
                    (cell.column.id === "availabilityStatus") ? (
                      <ReusableBadge
                        colorScheme={getStatusColorScheme(cell.value)}
                        variant={getStatusVariant(cell.value)}
                      >
                        {cell.value}
                      </ReusableBadge>
                    ) : (
                      cell.render("Cell")
                    )}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Box
        mt={4}
        textAlign="center"
        display={!canPreviousPage && !canNextPage && "none"}
      >
        <Button
          size="sm"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
          </strong>{" "}
        </span>
        <Button
          colorScheme="facebook"
          onClick={() => nextPage()}
          size="sm"
          disabled={!canNextPage}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

// ... (getStatusColorScheme and getStatusVariant functions remain unchanged)

export default DataTable;
