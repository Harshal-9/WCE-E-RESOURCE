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
    <div
      style={{
        margin: "0 0",
        height: "100%",
        textAlign: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundImage:
          "url(https://media.istockphoto.com/photos/dark-blue-de-focused-blurred-motion-abstract-background-picture-id1216628493?b=1&k=20&m=1216628493&s=170667a&w=0&h=XgGPQTxjdXuWOVHtTPo-zZziQG-qffO5_K4dppHpccI=)"
      }}
    >
      <div>
        <div style={{ textAlign: "center" }}>
          <img
            src="https://uni.wcoeapps.in/site/static/images/wcoe.jpg"
            alt="wceImg"
            width="75px"
            height="75px"
            style={{ borderRadius: "50%", margin: "1%", float: "center" }}
          />
        </div>
        <h1
          style={{
            color: "#0c72af",
            display: "inline-block",
            margin: "0"
          }}
        >
          WCE E-RESOURCE
        </h1>
      </div>
      <div className="login">
        <h2 id="headerTitle">LOGIN</h2>
        <form id="studentLoginForm" onSubmit={handleSubmit}>
          <input
            className="row "
            placeholder="Username"
            name="username"
          ></input>
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
      <p>WCE</p>
    </div>
  );
}
export default StudentLogin;
