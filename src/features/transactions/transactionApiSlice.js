import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice.js";

const transactionsAdapter = createEntityAdapter({});

const initialState = transactionsAdapter.getInitialState();

export const transactionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: () => ({
        url: "/transactions",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedTransactions = responseData.map((transaction) => {
          transaction.id = transaction._id;
          return transaction;
        });
        return transactionsAdapter.setAll(initialState, loadedTransactions);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Transaction", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Transaction", id })),
          ];
        } else return [{ type: "Transaction", id: "LIST" }];
      },
    }),
    addNewTransaction: builder.mutation({
      query: (initialTransactionData) => ({
        url: "/transactions",
        method: "POST",
        body: {
          ...initialTransactionData,
        },
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),
    
  }),
});

export const {
  useGetTransactionsQuery,
  useAddNewTransactionMutation
} = transactionsApiSlice;

// returns the query result object
export const selectTransactionsResult = transactionsApiSlice.endpoints.getTransactions.select();

// creates memoized selector
const selectTransactionsData = createSelector(
  selectTransactionsResult,
  (transactionsResult) => transactionsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllTransactions,
  selectById: selectTransactionById,
  selectIds: selectTransactionIds,
  // Pass in a selector that returns the students slice of state
} = transactionsAdapter.getSelectors(
  (state) => selectTransactionsData(state) ?? initialState
);
