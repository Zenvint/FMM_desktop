/** @format */
import React from "react";
import Box from "@mui/material/Box";
import Header from "../../components/Header.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUpdateUserMutation,useDeleteUserMutation, useGetUsersQuery } from "./usersApiSlice.js";
import ROLES from "../../configs/roles.js";
import { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader.js";
import { tokens } from "../../hooks/theme";
import { useTheme } from "@mui/material";


const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = () => {
  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  //   useEffect(()=> {console.log(user)}, [user])

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setEmail("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess,isDelSuccess, navigate]);

  const onUserEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onActiveChanged = () => setActive((prev) => !prev);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTMLCollection
      (option) => option.value
    );
    setRoles(values);
  };

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, email, password, roles, active });
    } else {
      await updateUser({ id: user.id, email, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id })
  }

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave = [roles.length, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

  if (!user || isLoading ) return <PulseLoader color={"#FFF"} />;

  return (
    <Box m="20px">
      <Header title="New User" />

      <p className={errClass}>{errContent}</p>

      <form
        onSubmit={(e) => e.preventDefault()}
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
            autoComplete="off"
            value={password}
            onChange={onPasswordChanged}
          />
        </div>

        <div className="input-container">
          <label
            className="form__label form__checkbox-container"
            htmlFor="user-active"
          >
            ACTIVE:
            <input
              className="form__checkbox"
              id="user-active"
              name="user-active"
              type="checkbox"
              checked={active}
              onChange={onActiveChanged}
              style={{ marginLeft: "10px", marginTop: "18px" }}
            />
          </label>
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

        <Link to={"/dash/users"} style={{ marginLeft: "10rem"}}>
          <button className="submit-button" variant="contained" style={{ background: colors.grey[400]}}>
            Cancel
          </button>
        </Link>
        <button
          className="submit-button"
          onClick={onSaveUserClicked}
          disabled={!canSave}
          style={{ marginLeft: "1rem" }}
        >
          Save
        </button>
        <button className="submit-button" onClick={onDeleteUserClicked} style={{ marginLeft: "1rem", background: colors.redAccent[400] }}>
          Dismiss
        </button>
      </form>
    </Box>
  );
};

export default EditUserForm;
