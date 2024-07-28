import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice.js";

const expensesAdapter = createEntityAdapter({});

const initialState = expensesAdapter.getInitialState();

export const expensesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => ({
        url: "/expenses",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedExpenses = responseData.map((expense) => {
          expense.id = expense._id;
          return expense;
        });
        return expensesAdapter.setAll(initialState, loadedExpenses);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Expense", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Expense", id })),
          ];
        } else return [{ type: "Expense", id: "LIST" }];
      },
    }),
    addNewExpense: builder.mutation({
      query: (initialExpense) => ({
        url: "/expenses",
        method: "POST",
        body: {
          ...initialExpense,
        },
      }),
      invalidatesTags: [{ type: "Expense", id: "LIST" }],
    }),
    updateExpense: builder.mutation({
      query: (initialExpense) => ({
        url: "/expenses",
        method: "PATCH",
        body: {
          ...initialExpense,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Expense", id: arg.id },
      ],
    }),
    deleteExpense: builder.mutation({
      query: ({ id }) => ({
        url: `/expenses`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Expense", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useAddNewExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApiSlice;

// returns the query result object
export const selectExpensesResult =
  expensesApiSlice.endpoints.getExpenses.select();

// creates memoized selector
const selectExpensesData = createSelector(
  selectExpensesResult,
  (expensesResult) => expensesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllExpenses,
  selectById: selectExpenseById,
  selectIds: selectExpenseIds,
  // Pass in a selector that returns the notes slice of state
} = expensesAdapter.getSelectors(
  (state) => selectExpensesData(state) ?? initialState
);
