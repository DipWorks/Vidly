import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

//functional component table
// and using object destruturing to get props objects
const Table = ({ data, sortColumn, onSort, columns }) => {
  // return statement
  return (
    // this table contains two high level components in TableHeader and TableBody
    // which means there is same level of abstraction in this component
    //which is a good programming practise
    <table className="table">
      <caption>Displaying {data.length} data</caption>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
