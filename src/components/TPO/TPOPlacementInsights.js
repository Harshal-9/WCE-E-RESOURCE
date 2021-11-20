import React from "react";
import Select from "react-select";
import Sidebar from "./TPOSlideBar";
import "./TPOPlacementInsights.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";

function TPOPlacementInsights() {
  function sendData(event) {
    event.preventDefault();
    console.log(event.target.fName.value);
    console.log(event.target.mName.value);
    console.log(event.target.lName.value);

    const fd = new FormData();
    const file = event.target.interviewExp.files[0];
    let fileName = "";
    if (file) {
      fileName = event.target.interviewExp.files[0].name;
      console.log(fileName);
    }
    fd.append("firstName", event.target.fName.value);
    fd.append("middleName", event.target.mName.value);
    fd.append("lastName", event.target.lName.value);
    fd.append("newCompany", event.target.newCompany.value);
    fd.append("branch", event.target.branch.value);
    fd.append("yearOfPassing", event.target.YOP.value);
    fd.append("company", event.target.companySelect.value);
    fd.append("linkedinProfile", event.target.linkedinUrl.value);
    fd.append("fileToUpload", file, fileName);

    axios
      .post("https://afternoon-ocean-57702.herokuapp.com/placement", fd)
      .then((res) => {
        console.log(res);
        alert("New Record Added");
        window.location.reload();
      })
      .catch((err) => {
        console.log("error occured", err);
        alert("Record Addition Failed!!");
        window.location.reload();
      });
  }
  const [role, setRole] = useState("");
  const [companiesArray, setCompaniesArray] = useState([
    { label: "TCS", value: "TCS" }
  ]);
  const [labelName, setLabelName] = useState("Upload Here");

  useEffect(() => {
    axios
      .get("https://afternoon-ocean-57702.herokuapp.com/login", {
        withCredentials: true
      })
      .then((res) => {
        console.log(res);
        if (res.data.loggedIn === false) setRole("invalid");
        else {
          setRole(res.data.decodedData.role);
          axios
            .get("https://afternoon-ocean-57702.herokuapp.com/company")
            .then((res) => {
              console.log(res);
              let tempArray = [{ label: "TCS", value: "TCS" }];
              for (let i = 0; i < res.data.length; i++) {
                tempArray.push({
                  label: res.data[i].company,
                  value: res.data[i].company
                });
              }
              setCompaniesArray(tempArray);
            })
            .catch((err) => {
              console.log("error", err);
            });
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
      {role === "" || role === "TPO" ? (
        <div>
          <Sidebar />
          <div
            className="content"
            style={{
              color: "white",
              height: "1000px",
              // backgroundColor: "#4b84bd"
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundImage:
                "url(https://media.istockphoto.com/photos/dark-blue-de-focused-blurred-motion-abstract-background-picture-id1216628493?b=1&k=20&m=1216628493&s=170667a&w=0&h=XgGPQTxjdXuWOVHtTPo-zZziQG-qffO5_K4dppHpccI=)"
            }}
          >
            <div
              className="TPOPI"
              style={{
                boxShadow: "10px 10px white",
                borderStyle: "solid",
                borderWidth: "0.5px",
                marginTop: "40px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                backgroundImage:
                  "url(https://media.istockphoto.com/photos/dark-blue-de-focused-blurred-motion-abstract-background-picture-id1216628493?b=1&k=20&m=1216628493&s=170667a&w=0&h=XgGPQTxjdXuWOVHtTPo-zZziQG-qffO5_K4dppHpccI=)"
              }}
            >
              <h1 style={{ textAlign: "center" }}>
                <q>PLACEMENT INSIGHTS</q>
              </h1>
              <br />
              <form style={{ textAlign: "center" }} onSubmit={sendData}>
                <label htmlFor="fName">Enter first Name : </label>
                <input type="text" id="fName" name="fName" required></input>
                <br />
                <br />
                <label htmlFor="mName">Enter middle Name : </label>
                <input type="text" id="mName" name="mName" required></input>
                <br />
                <br />
                <label htmlFor="lName">Enter last Name : </label>
                <input type="text" id="lName" name="lName" required></input>
                <br />
                <br />
                <label htmlFor="branch ">Select Branch : </label>
                <Select
                  name="branch"
                  id="companySelect"
                  className="branchSelect"
                  defaultValue={{ label: "CSE", value: "CSE" }}
                  options={[
                    { label: "CSE", value: "CSE" },
                    { label: "IT", value: "IT" },
                    { label: "ELECTRONICS", value: "ELECTRONICS" },
                    { label: "ELECTRICAL", value: "ELECTRICAL" },
                    { label: "MECH", value: "MECH" },
                    { label: "CIVIL", value: "CIVIL" }
                  ]}
                />
                <br />
                <br />
                <label>Enter year of passing : </label>
                <input
                  type="number"
                  id="yearOfPassing"
                  name="YOP"
                  required
                ></input>
                <br />
                <br />
                <label>Select a company : </label>
                <Select
                  name="companySelect"
                  id="companySelect"
                  className="companySelect"
                  defaultValue={{ label: "TCS", value: "TCS" }}
                  options={companiesArray}
                />
                <br />
                <br />
                <label htmlFor="lName">Add new company : </label>
                <input
                  name="newCompany"
                  type="text"
                  id="newCompany"
                  placeholder="Leave empty if selected "
                ></input>
                <br />
                <br />
                <label>Select interview experience : </label>
                <label
                  htmlFor="interviewExp"
                  style={{
                    borderStyle: "solid",
                    padding: "0.5%",
                    borderWidth: "0.5px"
                  }}
                >
                  {labelName}
                </label>
                <input
                  type="file"
                  id="interviewExp"
                  hidden
                  onChange={(event) => {
                    if (event.target.files[0].name)
                      setLabelName(event.target.files[0].name);
                  }}
                  name="interviewExp"
                ></input>
                <br />
                <br />
                <label>Enter linkedin profile link : </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  required
                ></input>
                <br />
                <br />
                <button type="submit">Submit</button>
                <br />
                <br />
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default TPOPlacementInsights;
