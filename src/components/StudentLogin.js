import React, { useState } from "react";
import "./LoginStyles.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

function StudentLogin() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [role, setRole] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event.target.username.value, event.target.password.value);

    const fd = new FormData();
    fd.append("username", event.target.username.value);
    fd.append("password", event.target.password.value);

    axios
      .post("https://afternoon-ocean-57702.herokuapp.com/login", fd, {
        withCredentials: true
      })
      .then((res) => {
        console.log(res);

        if (res.data.loggedIn === false) {
          setRole("invalid");
          alert("Invalid login credentials");
        } else {
          setRole(res.data.decodedData.role);
          setLoginSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setRole("invalid");
        alert("Error occured");
      });
  }

  return (
    <div className="login">
      <h2 id="headerTitle">LOGIN</h2>
      <form id="studentLoginForm" onSubmit={handleSubmit}>
        <input className="row " placeholder="Username" name="username"></input>
        <input
          className="row"
          placeholder="Password"
          name="password"
          type="password"
        ></input>
        <div id="button" className="row">
          <button>Login</button>
          <br />
        </div>
        {loginSuccess ? (
          role === "TPO" ? (
            <Redirect to="/TPOPage" />
          ) : (
            <Redirect to="/StudentPage" />
          )
        ) : null}
      </form>
    </div>
  );
}
export default StudentLogin;
