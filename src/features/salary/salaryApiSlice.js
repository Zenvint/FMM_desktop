import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice.js";

const salariesAdapter = createEntityAdapter({});

const initialState = salariesAdapter.getInitialState();

export const salariesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalaries: builder.query({
      query: () => ({
        url: "/salary",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedSalaries = responseData.map((salary) => {
          salary.id = salary._id;
          return salary;
        });
        return salariesAdapter.setAll(initialState, loadedSalaries);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Salary", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Salary", id })),
          ];
        } else return [{ type: "Salary", id: "LIST" }];
      },
    }),
    updateSalary: builder.mutation({
      query: (initialSalary) => ({
        url: "/salary",
        method: "PATCH",
        body: {
          ...initialSalary,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Salary", id: arg.id }],
    })
  }),
});

export const {
  useGetSalariesQuery,
  useUpdateSalaryMutation
} = salariesApiSlice;

// returns the query result object
export const selectSalariesResult = salariesApiSlice.endpoints.getSalaries.select();

// creates memoized selector
const selectSalariesData = createSelector(
  selectSalariesResult,
  (salariesResult) => salariesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllSalaries,
  selectById: selectSalaryById,
  selectIds: selectSalaryIds,
  // Pass in a selector that returns the notes slice of state
} = salariesAdapter.getSelectors(
  (state) => selectSalariesData(state) ?? initialState
);
