import React, { useEffect } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../hooks/theme.js";
import { Box } from "@mui/material";
import Header from "../../components/Header.jsx";
import { AddBtn } from "../../components/Button.jsx";
import { useNewFeeYearMutation } from "./feesApiSlice.js";
import PulseLoader from "react-spinners/PulseLoader.js";
import { useSnackbar } from "notistack";
import useConfirmSnackbar from "../../hooks/useConfirmSnackbar.js";
import { useNewSalaryMonthMutation } from "../salary/salaryApiSlice.js";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const FeeSettings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { enqueueSnackbar } = useSnackbar();
  const { showConfirmation } = useConfirmSnackbar();

  const [newFeeYear, { isLoading, isSuccess, isError, error }] =
    useNewFeeYearMutation();

  const [
    newSalarymonth,
    {
      isLoading: isNSMLoading,
      isSuccess: isNSMSuccess,
      isError: isNSMError,
      error: NSMerror,
    },
  ] = useNewSalaryMonthMutation();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("New Fee year Successed", { variant: "success" });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("An Error occured", { variant: "error" });
    }
  }, [isError]);

  useEffect(() => {
    if (isNSMSuccess) {
      enqueueSnackbar("New Salary Month Successed", { variant: "success" });
    }
  }, [isNSMSuccess]);

  useEffect(() => {
    if (isNSMError) {
      enqueueSnackbar("An Error occured", { variant: "error" });
    }
  }, [isNSMError]);

  const handleStartNewFeeYear = () => {
    showConfirmation(
      "Are you sure you want to perform this action?",
      startNewFeeYear
    );
  };

  const handleStartNewSalaryMonth = () => {
    showConfirmation(
      "Are you sure you want to perform this action?",
      startNewSalaryMonth
    );
  };

  const startNewFeeYear = async () => {
    const currentYear = new Date().getFullYear();
    await newFeeYear({ yearstring: `${currentYear - 1}-${currentYear}` });
  };

  const startNewSalaryMonth = async () => {
    const currentDate = new Date();
    await newSalarymonth({ datestring: format(currentDate, "yyyy-MM-dd") });
  };

  const errClass = isError || isNSMError ? "errmsg" : "offscreen";
  const errContent = (error?.data?.message || NSMerror?.data?.message) ?? "";

  return (
    <Box>
      <Box p={2}>
        <Box display={"flex"} justifyContent={"space-between"}>
        <Header title="SETTINGS" subtitle="System General Settings" />
        <Link to={"/dash/settings"} style={{ color: colors.grey[100] }}>
            <ArrowBackOutlinedIcon className="li_icon" />
          </Link>
        </Box>
        <div className="box" style={{ margin: "2rem auto", display: "flex", flexDirection: "column", gap: "3rem" }}>
          <fieldset>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              color={colors.grey[100]}
            >
              <p className="text" style={{ fontWeight: "bold" }} >Start a new academic year</p>
              <AddBtn btnName={"Start"} handleEdit={handleStartNewFeeYear} />
            </Box>
            {(isLoading || isError) && (
              <Box>
                {isLoading && <PulseLoader color={"orange"} />}
                <p className={errClass}>{errContent}</p>
              </Box>
            )}
          </fieldset>

          <fieldset>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              color={colors.grey[100]}
            >
              <p className="text" style={{ fontWeight: "bold" }}  > Start a new Salary Month</p>
              <AddBtn
                btnName={"Start"}
                handleEdit={handleStartNewSalaryMonth}
              />
            </Box>
            {(isNSMLoading || isNSMError) && (
              <Box>
                {isNSMLoading && <PulseLoader color={"orange"} />}
                <p className={errClass}>{errContent}</p>
              </Box>
            )}
          </fieldset>
        </div>
      </Box>
    </Box>
  );
};

export default FeeSettings;
