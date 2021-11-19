import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Select from "react-select";
import "./NewLoginDetails.css";
import axios from "axios";
import { Redirect } from "react-router-dom";

function LoginDetails() {
  const [role, setRole] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event.target.fName.value);
    // console.log(event.target.PRN.value);

    if (
      event.target.selectedRole.value === "student" &&
      event.target.PRN.value === ""
    ) {
      alert("Enter PRN for student!");
      return;
    }

    const fd = new FormData();
    fd.append("firstName", event.target.fName.value);
    fd.append("middleName", event.target.mName.value);
    fd.append("lastName", event.target.lName.value);
    fd.append("PRN", event.target.PRN.value);
    fd.append("email", event.target.email.value);
    fd.append("contact", event.target.contact.value);
    fd.append("department", event.target.department.value);
    fd.append("role", event.target.selectedRole.value);

    axios
      .post("https://afternoon-ocean-57702.herokuapp.com/profile", fd)
      .then((res) => {
        console.log(res);
        alert("User added successfully");
      })
      .catch((err) => {
        console.log("error");
        console.log(err.message);
        alert("Failed to add User");
      });
  }

  useEffect(() => {
    axios
      .get("https://afternoon-ocean-57702.herokuapp.com/login", {
        withCredentials: true
      })
      .then((res) => {
        console.log(res);
        if (res.data.loggedIn === false) setRole("invalid");
        //to get resources
        else {
          setRole(res.data.decodedData.role);
        }
      })
      .catch((err) => {
        console.log("error");
        console.log(err.message);
        setRole("invalid");
      });
  }, []);

  return (
    <div>
      {role === "student" || role === "invalid" ? (
        <Redirect to="/StudentPage/profile" />
      ) : (
        <div>
          <Sidebar />
          <div
            className="content"
            style={{
              color: "white",
              // backgroundColor: "#4b84bd"
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundImage:
                "url(https://media.istockphoto.com/photos/dark-blue-de-focused-blurred-motion-abstract-background-picture-id1216628493?b=1&k=20&m=1216628493&s=170667a&w=0&h=XgGPQTxjdXuWOVHtTPo-zZziQG-qffO5_K4dppHpccI=)"
            }}
          >
            <div
              style={{
                borderStyle: "solid",
                borderWidth: "0.5px",
                marginTop: "40px",
                textAlign: "center",
                marginLeft: "20%",
                marginRight: "20%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundImage:
                  "url(https://media.istockphoto.com/photos/dark-blue-de-focused-blurred-motion-abstract-background-picture-id1216628493?b=1&k=20&m=1216628493&s=170667a&w=0&h=XgGPQTxjdXuWOVHtTPo-zZziQG-qffO5_K4dppHpccI=)"
              }}
            >
              <h1>Add new user</h1>
              <br />
              <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
                <label htmlFor="fName">Enter first Name : </label>
                <input type="text" name="fName" id="fName" required></input>
                <br />
                <br />
                <label htmlFor="mName">Enter middle Name : </label>
                <input type="text" name="mName" id="mName"></input>
                <br />
                <br />
                <label htmlFor="lName">Enter last Name : </label>
                <input type="text" name="lName" id="lName" required></input>
                <br />
                <br />
                <label htmlFor="prn">Enter PRN : </label>
                <input type="text" name="PRN"></input>
                <br />
                <br />
                <label htmlFor="email">Enter Email : </label>
                <input type="text" name="email" required></input>
                <br />
                <br />
                <label htmlFor="contactNo">Enter Contact Number : </label>
                <input
                  type="tel"
                  name="contact"
                  pattern="[0-9]{10}"
                  placeholder="10 digit number"
                ></input>
                <br />
                <br />
                <label htmlFor="department ">Enter Department: </label>
                <input type="text" name="department" required></input>
                <br />
                <br />
                <label htmlFor="selectedRole">Select your role : </label>
                <Select
                  id="selectRole"
                  className="selectRole"
                  name="selectedRole"
                  defaultValue={{ label: "Student", value: "student" }}
                  options={[
                    { label: "Student", value: "student" },
                    { label: "Faculty", value: "faculty" },
                    { label: "TPO", value: "TPO" }
                  ]}
                  required
                />

                <br />
                <br />
                <br />
                <button type="submit">Submit</button>
                <br />
                <br />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginDetails;
