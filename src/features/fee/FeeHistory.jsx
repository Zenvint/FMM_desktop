import React from "react";
import { Box } from "@mui/material";
import { useGetFeesQuery } from "./feesApiSlice.js";
import FeeHistoryTile from "./FeeHistoryTile.jsx";

const FeeHistory = ({ id }) => {
  const { fee } = useGetFeesQuery("feesList", {
    selectFromResult: ({ data }) => ({
      fee: data?.entities[id],
    }),
  });

  const feerecords = fee.history;
  let feehistorycontent = [];
  const keys = Object.keys(feerecords);
  feehistorycontent = keys.map((key) => (
    <FeeHistoryTile
      key={key}
      id={id}
      yearstring={key}
      record={feerecords[key]}
    />
  ));
  return (
    <fieldset>
      <legend>Fee History</legend>
      <Box width={"45vw"} height={"33vh"} overflow={"auto"}>
        {feehistorycontent}
      </Box>
    </fieldset>
  );
};

export default FeeHistory;
