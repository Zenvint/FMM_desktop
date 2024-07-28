import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice.js";

const feesAdapter = createEntityAdapter({});

const initialState = feesAdapter.getInitialState();

export const feesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFees: builder.query({
      query: () => ({
        url: "/fees",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedFees = responseData.map((fee) => {
          fee.id = fee._id;
          return fee;
        });
        return feesAdapter.setAll(initialState, loadedFees);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Fee", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Fee", id })),
          ];
        } else return [{ type: "Fee", id: "LIST" }];
      },
    }),
    updateFee: builder.mutation({
      query: (initialFee) => ({
        url: "/fees",
        method: "PATCH",
        body: {
          ...initialFee,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Fee", id: arg.id }],
    })
  }),
});

export const {
  useGetFeesQuery,
  useUpdateFeeMutation
} = feesApiSlice;

// returns the query result object
export const selectFeesResult = feesApiSlice.endpoints.getFees.select();

// creates memoized selector
const selectFeesData = createSelector(
  selectFeesResult,
  (feesResult) => feesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllFees,
  selectById: selectFeeById,
  selectIds: selectFeeIds,
  // Pass in a selector that returns the notes slice of state
} = feesAdapter.getSelectors(
  (state) => selectFeesData(state) ?? initialState
);
