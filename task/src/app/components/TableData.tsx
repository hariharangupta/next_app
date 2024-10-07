"use client";
import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useRouter } from "next/navigation";
import tableData from "../../util/tabledata";
import { debounce } from "lodash";

const TableData = () => {
  const router = useRouter();
  // const [tableData, setTableData] = useState(data);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  const debounceSearch = debounce((term: string) => {
    setDebouncedValue(term);
  }, 300);

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    const getData = storedData ? JSON.parse(storedData) : null;
    if (!getData || !getData.token) {
      router.push("/");
      return;
    }

    // setLoading(true);
    // setError("");

    // axios
    //   .get("https://ditscrm.divsolution.com/task-Api", {
    //      headers: {
    //       Authorization: `Bearer ${getData.token}`,
    //      },
    //   })
    //   .then((response) => {
    //     console.log(response.data.data);
    //   })
    //   .catch((error) => {
    //     setError("Error fetching data");
    //     console.error(error);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, [router]);

  const filteredData = tableData.filter((item) => {
    return (
      item.fullName.toLowerCase().includes(debouncedValue.toLowerCase()) ||
      item.phoneNumber.includes(debouncedValue) ||
      item.email.toLowerCase().includes(debouncedValue.toLowerCase()) ||
      item.adId.toString().includes(debouncedValue) ||
      item.campaignName.toLowerCase().includes(debouncedValue.toLowerCase()) ||
      item.postCode.includes(debouncedValue)
    );
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
    debounceSearch(event.target.value);
  };

  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen main">
  //       <h1>Error</h1>
  //     </div>
  //   );
  // }

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen main">
  //       <h1>Loading</h1>
  //     </div>
  //   );
  // }

  return (
    <div className="flex items-center justify-center w-screen h-screen table">
      <div className="w-full max-w m-auto p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Table Data</h1>
        <div className="h-10 m-30">
          <input
            className="outline-none px-2 bg-gray-200 border-none h-10 w-1/2 rounded"
            placeholder="Search.."
            value={searchValue}
            name="searchValue"
            onChange={handleSearch}
          />
        </div>
        <table className="min-w-full table-fixed mt-3">
          <thead>
            <tr className="">
              <th className="px-4 py-2 text-center border-stone-100 border">
                Name
              </th>
              <th className="px-4 py-2 text-center border-stone-100 border">
                Phone Number
              </th>
              <th className="px-4 py-2 text-center border-stone-100 border">
                Email
              </th>
              <th className="px-4 py-2 text-center border-stone-100 border">
                AdId
              </th>
              <th className="px-4 py-2 text-center border-stone-100 border">
                Campaign Name
              </th>
              <th className="px-4 py-2 text-center border-stone-100 border">
                Post Code
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={index} className="">
                <td className="px-4 py-2 border-stone-100 border text-center">
                  {item.fullName}
                </td>
                <td className="px-4 py-2 border-stone-100 border text-center">
                  {item.phoneNumber}
                </td>
                <td className="px-4 py-2 border-stone-100 border text-center">
                  {item.email}
                </td>
                <td className="px-4 py-2 border-stone-100 border text-center">
                  {item.adId}
                </td>
                <td className="px-4 py-2 border-stone-100 border text-center">
                  {item.campaignName}
                </td>
                <td className="px-4 py-2 border-stone-100 border text-center">
                  {item.postCode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentRows.length === 0 ? (
          <h1 className="w-full flex justify-center items-center p-10">
            No Data Found
          </h1>
        ) : null}
        <div className="border border-stone-200 flex items-center justify-center p-5">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="border p-2 rounded border-stone-100"
          >
            Previous
          </button>
          <span className="border p-2 rounded border-white mx-4">{` Page ${currentPage} of ${totalPages} `}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="border p-2 rounded border-stone-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableData;
