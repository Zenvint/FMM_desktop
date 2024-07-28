/** @format */
import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetStaffsQuery,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} from "./staffsApiSlice.js";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader.js";
import { useSnackbar } from "notistack";

const EditStaffForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const { staff } = useGetStaffsQuery("staffsList", {
    selectFromResult: ({ data }) => ({
      staff: data?.entities[id],
    }),
  });

  //   useEffect(()=> {console.log(section)}, [section])

  const [updateStaff, { isLoading, isSuccess, isError, error }] =
    useUpdateStaffMutation();

  const [
    deleteStaff,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteStaffMutation();

  const navigate = useNavigate();

  const [isDelLoading, setIsDelLoading] = useState(false);

  const [name, setName] = useState(staff.name);
  const [gender, setGender] = useState(staff.gender);
  const [role, setRole] = useState(staff.role);
  const [description, setDescription] = useState(staff.description);
  const [email, setEmail] = useState(staff.email);
  const [phone, setPhone] = useState(staff.phone);
  const [salary, setSalary] = useState(staff.salary);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setIsDelLoading(false);
      setName("");
      setSalary(0);
      setDescription("");
      setGender("");
      setRole("");
      setEmail("");
      setPhone("");
      enqueueSnackbar(`Seccess`, { variant: "success" });
      navigate("/dash/staff");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  useEffect(() => {
    if (isError || isDelError) {
      setIsDelLoading(false);
      enqueueSnackbar(`An Error occured`, { variant: "error" });
    }
  }, [isError, isDelError]);

  const onNameChanged = (e) => setName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onGenderChanged = (e) => setGender(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onRoleChanged = (e) => setRole(e.target.value);
  const onPhoneChanged = (e) => setPhone(e.target.value);
  const onSalaryChanged = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setSalary(parseInt(value));
    }
  };

  const onSaveClicked = async (e) => {
    await updateStaff({
      id: staff.id,
      name,
      gender,
      role,
      description,
      email,
      phone,
      salary,
    });
  };

  const onDeleteClicked = async () => {
    setIsDelLoading(true);
    await deleteStaff({ id: staff.id });
  };

  let canSave = !isLoading;

  const errClass = isError || isDelError ? "errmsg" : "offscreen";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  if (!staff || isLoading || isDelLoading)
    return <PulseLoader color={"#FFF"} />;

  return (
    <Box m="20px">
      <Header title="Update Section" />

      <p className={errClass}>{errContent}</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="input-container">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Benefactor"
            required
            autoComplete="off"
            value={name}
            onChange={onNameChanged}
          />
        </div>

        <div className="input-container">
          <label>Gender:</label>
          <div className="radio-container">
            <div>
              <input
                type="radio"
                id="check-male"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={onGenderChanged}
                style={{ height: "16px", width: "30px" }}
              />
              <label htmlFor="check-male" style={{ fontWeight: "100" }}>
                {" "}
                Male{" "}
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="check-female"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={onGenderChanged}
                style={{ height: "16px", width: "30px" }}
              />
              <label htmlFor="check-female" style={{ fontWeight: "100" }}>
                {" "}
                Female{" "}
              </label>
            </div>
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="role">Role:</label>
          <textarea
            id="role"
            type="text"
            placeholder="Enter Role"
            required
            autoComplete="off"
            value={role}
            onChange={onRoleChanged}
          />
        </div>

        <div className="input-container">
          <label htmlFor="description">Job Description:</label>
          <textarea
            id="description"
            type="text"
            placeholder="Enter Job Description"
            required
            autoComplete="off"
            value={description}
            onChange={onDescriptionChanged}
          />
        </div>

        <div className="input-container">
          <label htmlFor="salary">Salary:</label>
          <input
            id="salary"
            type="number"
            min={0}
            placeholder="Enter Class Tuition FCFA"
            required
            autoComplete="off"
            value={salary}
            onChange={onSalaryChanged}
          />
        </div>

        <fieldset>
          <legend>Contact Information</legend>
          <div className="class_container">
            <div className="input-container">
              <label htmlFor="phone">phone number:</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={onPhoneChanged}
                placeholder="6 xx xx xx xx"
                required
              />
            </div>

            <div className="input-container">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={onEmailChanged}
                placeholder="example@gmail.com"
                required
              />
            </div>
          </div>
        </fieldset>

        <button
          className="submit-button"
          onClick={onSaveClicked}
          disabled={!canSave}
        >
          Save
        </button>
        <Link to={"/dash/finance/expenses"}>
          <button className="submit-button" variant="contained">
            Cancel
          </button>
        </Link>
        <button className="submit-button" onClick={onDeleteClicked}>
          Delete
        </button>
      </form>
    </Box>
  );
};

export default EditStaffForm;
