import React from "react";
import { useRef, useState, useEffect } from "react";
import { useNavigate,} from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice.js";
import { useLoginMutation } from "./authApiSlice.js";

import usePersist from "../../hooks/usePersist.js";
import PulseLoader from "react-spinners/PulseLoader";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      // errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value.trim());
  const handlePwdInput = (e) => setPassword(e.target.value.trim());
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <PulseLoader color={"#FFF"} />;

  const content =(
    <main className="login__page">
      
      <div className="wrapper">
      <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
        <h1>FBMM Portal</h1>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="email">Email</label> */}
          <input
            type="text"
            autoComplete="off"
            placeholder="Enter Email"
            id="email"
            ref={userRef}
            value={email}
            onChange={handleUserInput}
            required
          />
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            autoComplete="off"
            placeholder="Enter Password"
            id="password"
            value={password}
            onChange={handlePwdInput}
            required
          />
          <div className="check">
            <input type="checkbox" id="persist" checked={persist} onChange={handleToggle} />
            <label htmlFor="persist">Remember Me</label>
          </div>
          <button className="login_button" type="submit">Login</button>
        </form>
      </div>
    </main>
  )
  return content;
};

export default Login;
