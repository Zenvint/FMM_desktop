import React from "react";
import { Box } from "@mui/material";
import { useGetSalariesQuery } from "./salaryApiSlice.js";
import SalaryHistoryTile from "./SalaryHistoryTile.jsx";

const SalaryHistory = ({ id }) => {
  const { salary } = useGetSalariesQuery("salariesList", {
    selectFromResult: ({ data }) => ({
      salary: data?.entities[id],
    }),
  });

  const salaryrecords = salary?.history;
  let salaryhistorycontent = [];
  if (salaryrecords) {
    const keys = Object.keys(salaryrecords);
    salaryhistorycontent = keys.map((key) => (
      <SalaryHistoryTile
        key={key}
        id={id}
        datestring={key}
        record={salaryrecords[key]}
      />
    ));
  }
  return (
    <fieldset style={{padding: "15px", height: "45vh", overflow: "auto"}}>
      <legend>Salary History</legend>
      <Box>
        {salary?.history ? (
          salaryhistorycontent
        ) : (
          <p className="errmsg">No History</p>
        )}
      </Box>
    </fieldset>
  );
};

export default SalaryHistory;
