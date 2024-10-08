/** @format */
import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useAddNewUserMutation } from "./usersApiSlice.js";
import ROLES from "../../configs/roles.js";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";

const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Teacher"]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUserEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave =
    [roles.length, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ email, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

    if (isLoading){
      return <PulseLoader color={"orange"} />;
    }

  return (
    <Box m="20px">
      <Header title="New User" />

      <p className={errClass}>{error?.data?.message}</p>

      <form
        onSubmit={onSaveUserClicked}
        style={{
          background: colors.primary[400],
          padding: "25px",
          borderRadius: "10px",
          width: "70%",
          margin: "auto"
        }}
      >
        <div className="input-container">
          <label htmlFor="userEmail">User Email:</label>
          <input
            id="userEmail"
            type="email"
            placeholder="Enter Email"
            required
            autoComplete="off"
            value={email}
            onChange={onUserEmailChanged}
          />
        </div>

        <div className="input-container">
          <label className="form__label" htmlFor="userPassword">
            User Password:
            <span className="nowrap">[4-12 chars incl. !@#$%]</span>
          </label>
          <input
            className={`form__input ${validPwdClass}`}
            id="userPassword"
            type="password"
            placeholder="Enter user password"
            required
            autoComplete="off"
            value={password}
            onChange={onPasswordChanged}
          />
        </div>

        <div className="class_container">
          <div className="input-container">
            <label htmlFor="roles"> ASSIGNED ROLES: </label>
            <select
              id="roles"
              name="roles"
              className={`form__select ${validRolesClass}`}
              multiple={true}
              size="5"
              value={roles}
              onChange={onRolesChanged}
            >
              {options}
            </select>
          </div>
        </div>

        <Link to={"/dash/users"} style={{ marginLeft: "18rem" }}>
          <button
            className="submit-button"
            variant="contained"
            style={{ background: colors.grey[400] }}
          >
            Cancel
          </button>
        </Link>
        <button
          className="submit-button"
          type="submit"
          disabled={!canSave}
          style={{ marginLeft: "1rem" }}
        >
          Save
        </button>
      </form>
    </Box>
  );
};

export default NewUserForm;
