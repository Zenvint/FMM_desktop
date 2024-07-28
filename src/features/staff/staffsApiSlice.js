import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice.js";

const staffsAdapter = createEntityAdapter({});

const initialState = staffsAdapter.getInitialState();

export const staffsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStaffs: builder.query({
      query: () => ({
        url: "/staffs",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedStaffs = responseData.map((staff) => {
          staff.id = staff._id;
          return staff;
        });
        return staffsAdapter.setAll(initialState, loadedStaffs);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Staff", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Staff", id })),
          ];
        } else return [{ type: "Staff", id: "LIST" }];
      },
    }),
    addNewStaff: builder.mutation({
      query: (initialStaff) => ({
        url: "/staffs",
        method: "POST",
        body: {
          ...initialStaff,
        },
      }),
      invalidatesTags: [{ type: "Staff", id: "LIST" }],
    }),
    updateStaff: builder.mutation({
      query: (initialStaff) => ({
        url: "/staffs",
        method: "PATCH",
        body: {
          ...initialStaff,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Staff", id: arg.id },
      ],
    }),
    deleteStaff: builder.mutation({
      query: ({ id }) => ({
        url: `/staffs`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Staff", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetStaffsQuery,
  useAddNewStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = staffsApiSlice;

// returns the query result object
export const selectStaffsResult =
  staffsApiSlice.endpoints.getStaffs.select();

// creates memoized selector
const selectStaffsData = createSelector(
  selectStaffsResult,
  (staffsResult) => staffsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllStaffs,
  selectById: selectStaffById,
  selectIds: selectStaffIds,
  // Pass in a selector that returns the notes slice of state
} = staffsAdapter.getSelectors(
  (state) => selectStaffsData(state) ?? initialState
);
