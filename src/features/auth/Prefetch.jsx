import React from "react";
import { store } from "../../app/store.js";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { usersApiSlice } from "../users/usersApiSlice.js";
import { sectionsApiSlice } from "../sections/sectionsApiSlice.js";
import { classesApiSlice } from "../classes/classesApiSlice.js";
import { studentsApiSlice } from "../students/studentsApiSlice.js";
import { installmentsApiSlice } from "../installments/installmentsApiSlice.js";
import { expensesApiSlice } from "../expenses/expensesApiSlice.js";
import { feesApiSlice } from "../fee/feesApiSlice.js";
import { staffsApiSlice } from "../staff/staffsApiSlice.js";
import { salariesApiSlice } from "../salary/salaryApiSlice.js";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
    store.dispatch(
      expensesApiSlice.util.prefetch("getExpenses", "expensesList", {
        force: true,
      })
    );
    store.dispatch(
      sectionsApiSlice.util.prefetch("getSections", "sectionsList", {
        force: true,
      })
    );
    store.dispatch(
      classesApiSlice.util.prefetch("getClasses", "classesList", {
        force: true,
      })
    );
    store.dispatch(
      studentsApiSlice.util.prefetch("getStudents", "studentsList", {
        force: true,
      })
    );
    store.dispatch(
      installmentsApiSlice.util.prefetch(
        "getInstallments",
        "installmentsList",
        { force: true }
      )
    );
    store.dispatch(
      feesApiSlice.util.prefetch("getFees", "feesList", { force: true })
    );
    store.dispatch(
      staffsApiSlice.util.prefetch("getStaffs", "staffsList", { force: true })
    );
    store.dispatch(
      salariesApiSlice.util.prefetch("getSalaries", "salariesList", { force: true })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
