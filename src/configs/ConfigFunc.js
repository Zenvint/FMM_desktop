import { useGetStudentsQuery } from "../features/students/studentsApiSlice";

export const getMatricule = (text) => {
    const { students } = useGetStudentsQuery("studentsList", {
        selectFromResult: ({ data }) => ({
          students: data?.ids.map((id) => data?.entities[id]),
        }),
      });
  return students[-1].matricule;
};
