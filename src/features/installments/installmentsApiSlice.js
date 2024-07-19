import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice.js";

const installmentsAdapter = createEntityAdapter({});

const initialState = installmentsAdapter.getInitialState();

export const installmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstallments: builder.query({
      query: () => ({
        url: "/installments",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedInstallments = responseData.map((installment) => {
          installment.id = installment._id;
          return installment;
        });
        return installmentsAdapter.setAll(initialState, loadedInstallments);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Installment", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Installment", id })),
          ];
        } else return [{ type: "Installment", id: "LIST" }];
      },
    }),
    updateInstallment: builder.mutation({
      query: (initialInstallment) => ({
        url: "/installments",
        method: "PATCH",
        body: {
          ...initialInstallment,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Installment", id: arg.id }],
    })
  }),
});

export const {
  useGetInstallmentsQuery,
  useUpdateInstallmentMutation
} = installmentsApiSlice;

// returns the query result object
export const selectInstallmentsResult = installmentsApiSlice.endpoints.getInstallments.select();

// creates memoized selector
const selectInstallmentsData = createSelector(
  selectInstallmentsResult,
  (installmentsResult) => installmentsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllInstallments,
  selectById: selectInstallmentById,
  selectIds: selectInstallmentIds,
  // Pass in a selector that returns the notes slice of state
} = installmentsAdapter.getSelectors(
  (state) => selectInstallmentsData(state) ?? initialState
);
