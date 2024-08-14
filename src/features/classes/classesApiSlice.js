import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice.js";

const classesAdapter = createEntityAdapter({});

const initialState = classesAdapter.getInitialState();

export const classesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query({
      query: () => ({
        url: "/classes",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedClasses = responseData.map((classObj) => {
            classObj.id = classObj._id;
          return classObj;
        });
        return classesAdapter.setAll(initialState, loadedClasses);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Class", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Class", id })),
          ];
        } else return [{ type: "Class", id: "LIST" }];
      },
    }),
    addNewClass: builder.mutation({
      query: (initialClass) => ({
        url: "/classes",
        method: "POST",
        body: {
          ...initialClass,
        },
      }),
      invalidatesTags: [{ type: "Class", id: "LIST" }],
    }),
    updateClass: builder.mutation({
      query: (initialClass) => ({
        url: "/classes",
        method: "PATCH",
        body: {
          ...initialClass,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Class", id: arg.id }],
    }),
    deleteClass: builder.mutation({
      query: ({ id }) => ({
        url: `/classes`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Class", id: arg.id }],
    }),
  }),
});

export const {
  useGetClassesQuery,
  useAddNewClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classesApiSlice;

// returns the query result object
export const selectClassesResult = classesApiSlice.endpoints.getClasses.select();

// creates memoized selector
const selectClassesData = createSelector(
  selectClassesResult,
  (classesResult) => classesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllClasses,
  selectById: selectClassById,
  selectIds: selectClassIds,
  // Pass in a selector that returns the notes slice of state
} = classesAdapter.getSelectors(
  (state) => selectClassesData(state) ?? initialState
);
