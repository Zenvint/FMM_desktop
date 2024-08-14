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

  const feerecords = fee?.history;
  let feehistorycontent = [];
  let keys;
  if (feerecords) {
    keys = Object.keys(feerecords);
    feehistorycontent = keys.map((key) => (
      <FeeHistoryTile
        key={key}
        id={id}
        yearstring={key}
        record={feerecords[key]}
      />
    ));
  }
  return (
    <fieldset style={{height: "43vh", width:"70vw", maxHeight:"42vh", overflow:"auto", margin:"auto" }}>
      <legend>Fee History</legend>
      <Box >
        {fee?.history ? (
          feehistorycontent
        ) : (
          <p className="errmsg">No History</p>
        )}
      </Box>
    </fieldset>
  );
};

export default FeeHistory;
