import { formatDate } from "@/utils/commonUtils";
import { ICustomTable } from "../../interfaces/componentsInterface";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import UpdateCategorySubCategoryImage from "./UpdateCategorySubCategoryImage";
import { ICategoryDataType, ISubCategoryType } from "@/interfaces/commonInterfaces";

function CustomTable({ tableData }: { tableData: ICustomTable }) {
  const navigate = useNavigate();
  const perPageEntries: number[] = useMemo(() => [5, 10, 15, 20], []);
  const [limit, setLimit] = useState<number>(perPageEntries[0]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filteredData, setFilteredData] = useState<ICustomTable["rowsData"]>(tableData.rowsData);
  const [paginatedData, setPaginatedData] = useState<ICustomTable["rowsData"]>([]);

  const handleFilterData = useCallback(
    (searchParam: string) => {
      if (searchParam.trim() !== "" &&  tableData.rowsData) {
        const filtered = tableData.rowsData.filter((obj) =>
          Object.values(obj).join(",").toLowerCase().includes(searchParam.toLowerCase())
        ) as ICustomTable['rowsData'];
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to first page after filtering
      } else {
        setFilteredData(tableData.rowsData);
      }
    },
    [tableData.rowsData]
  );

  useEffect(() => {
    if(filteredData)
      setTotalPages(Math.ceil(filteredData.length / limit));
  }, [filteredData, limit]);

  useEffect(() => {
    if(filteredData)
    {
      const startIndex = (currentPage - 1) * limit;
      const endIndex = startIndex + limit;
      setPaginatedData(filteredData.slice(startIndex, endIndex));
    }
  }, [limit, currentPage, filteredData]);

  useEffect(() =>{
    setFilteredData(tableData.rowsData);
  },[filteredData,tableData.rowsData]);

  return (
    <Card>
      <CardHeader>
        <div className="headers flex items-center justify-between gap-3 flex-wrap">
          <div className="titleheader flex  items-center gap-3">
            <CardTitle className="capitalize text-xl  shrink-0">{tableData.title}</CardTitle>
            <Select onValueChange={(val) => setLimit(parseInt(val))}>
              <SelectTrigger>
              {`${limit ??  0} Entries Per  Page`}
              </SelectTrigger>
              <SelectContent className="bg-white shadow-md rounded-md w-auto min-w-[120px] border border-gray-200">
                {perPageEntries.map((entry) => (
                  <SelectItem
                    key={formatDate(new Date())  + entry + Math.random()}
                    value={entry.toString()}
                    className="text-center py-2 px-4 bg-white hover:bg-gray-100 cursor-pointer"
                  >
                    {entry} Entries Per  Page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="search">
            <div className="flex items-center space-x-2 border p-2 rounded-lg w-full max-w-md shadow-sm">
              <Search className="w-5 h-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Search..."
                className="flex-1 border-none focus-visible:ring-0 focus:ring-0 focus:outline-none shadow-none"
                onChange={(e) => handleFilterData(e.target.value)}
              />
              <Button variant="default" className="shadow-none">
                Search
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {Array.isArray(paginatedData) && paginatedData.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                {tableData.headings.map((heading: string) => (
                  <TableHead key={formatDate(new Date())  + heading + Math.random()}>{heading}</TableHead>
                ))}
                {tableData.editActionRequired && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((data, index) => (
                <TableRow key={formatDate(new Date())  + index + Math.random()}>
                  {tableData.columns.map((column: string) => (
                    <TableCell key={formatDate(new Date())  + column + Math.random()}>
                      {(column.includes("created_at") || column.includes("updated_at"))
                        ? formatDate(data[column as keyof typeof data] as Date)
                        : column.includes("is_active") || column.includes("status")
                        ? data[column as keyof typeof data] == 1
                          ? "Active"
                          : "Inactive"
                        : (tableData.currentPage &&  tableData.currentPage === 'Main' &&  column.includes('sub_category_image')  || column.includes('category_image')) 
                        ?
                          <>
                          <UpdateCategorySubCategoryImage data={data as  ICategoryDataType   |  ISubCategoryType} />
                          </>
                         :
                         (data[column as keyof typeof data] as string | number)}
                    </TableCell>
                  ))}
                  {tableData.editActionRequired && (
                    <TableCell>
                      <Button
                        className="cursor-pointer text-xs bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() =>
                          navigate(
                            `${tableData.editActionRedirectUrl}${
                              tableData.isColumnIncludedInRedirectUrl
                                ? tableData.columnNameOfRedirectUrl &&
                                  tableData.columnNameOfRedirectUrl.split(",").length > 0
                                  ? data[tableData.columnNameOfRedirectUrl as keyof typeof data]
                                  : ""
                                : ""
                            }${
                              tableData.isSearchParamInRedirecdtUrl
                                ? "?" +
                                  tableData.searchParams
                                    ?.split(",")
                                    .map(
                                      (column) =>
                                        `${column}=${data[column as keyof typeof data]}`
                                    )
                                    .join("&")
                                : ""
                            }`,
                            { state: data }
                          )
                        }
                      >
                        Show Details
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {Array.isArray(paginatedData) && paginatedData.length > 0 && (
          <div className="flex gap-3 items-center justify-end mt-4">
            <Button
              variant="link"
              className={`cursor-pointer ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              className={`cursor-pointer bg-black text-white ${
                currentPage >= totalPages ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </Button>
          </div>
        )}
        {Array.isArray(paginatedData) && paginatedData.length === 0 && (
          <p className="mt-2 italic text-gray-600">No Data To Show...</p>
        )}
      </CardContent>
    </Card>
  );
}

export default CustomTable;