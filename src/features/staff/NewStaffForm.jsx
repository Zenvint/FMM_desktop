import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useAddNewStaffMutation } from "./staffsApiSlice.js";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useSnackbar } from "notistack";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";

const NewStaffForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [addNewStaff, { isLoading, isSuccess, isError, error }] =
    useAddNewStaffMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState(0);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  useEffect(() => {
    if (isSuccess) {
      setName("");
      setSalary(0);
      setDescription("");
      setGender("");
      setRole("");
      setEmail("");
      setPhone("");
      enqueueSnackbar(`staff added Seccessfully!`, { variant: "success" });
      navigate("/dash/staff");
    }
  }, [isSuccess, navigate, enqueueSnackbar]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(`could not add staff`, { variant: "error" });
    }
  }, [isError]);

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

  const canSave = !isLoading && salary > 0;

  const onSaveStaffClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewStaff({
        name,
        gender,
        role,
        description,
        email,
        phone,
        salary,
      });
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";

  if (isLoading) {
    return <PulseLoader color={"orange"} />;
  }

  const errContent = error?.data?.message ?? "";

  return (
    <Box m="20px">
      <Header title="New Expense" />

      <p className={errClass}>{errContent}</p>

      <form onSubmit={onSaveStaffClicked} style={{ background:colors.primary[400], padding: "25px", borderRadius: "10px", width: "70%", margin: "auto"}}>
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
            style={{ height: "30px", marginBottom: "10px" }}
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
            style={{ height: "30px", marginBottom: "10px" }}
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

        <Link to={"/dash/staff"} style={{ marginLeft: "8rem"}}>
          <button className="submit-button" variant="contained" style={{ background:colors.grey[400]}}>
            Cancel
          </button>
        </Link>
        <button className="submit-button" type="submit" disabled={!canSave} style={{marginLeft: "1rem"}}>
          Save
        </button>
      </form>
    </Box>
  );
};

export default NewStaffForm;
