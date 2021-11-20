import React from "react";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "./Profile.css";
function Profile() {
  const [role, setRole] = useState("");

  const [userData, setUserData] = useState({
    name: {
      firstName: "",
      middleName: "",
      lastName: ""
    },
    username: "",
    PRN: "",
    email: "",
    contact: "",
    department: "",
    numberOfResourceUploaded: 0
  });
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
            .get(
              "https://afternoon-ocean-57702.herokuapp.com/profile/" +
                res.data.decodedData.username
            )
            .then((data) => {
              console.log("Recived data :", data);
              setUserData(data.data);
            })
            .catch((err) => {
              console.log("error");
              console.log(err.message);
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
      {role === "invalid" ? (
        <Redirect to="/" />
      ) : (
        <div>
          <Sidebar />
          <div
            className="content ProfileRespoContent"
            style={{
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundImage:
                "url(https://t4.ftcdn.net/jpg/03/09/98/05/360_F_309980531_cX4DU03cgU35JKFrpRcbZlSQcaptgfx9.jpg)"
            }}
          >
            <div
              className="profileImg"
              style={{ marginTop: "20px", textAlign: "center" }}
            >
              <div
                style={{
                  textAlign: "center",
                  display: "inline-block"
                }}
                id="circle"
              >
                <h1
                  style={{ margin: "20%", marginTop: "25%", fontSize: "80px" }}
                >
                  {userData.name.firstName[0]}
                  {userData.name.lastName[0]}
                </h1>
              </div>
              <hr />
            </div>

            <br />
            <table className="ProfileRespo">
              <tr>
                <td className="ProfileTdTitle">Username :</td>
                <td className="ProfileTdContent">{userData.username}</td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">First Name :</td>
                <td className="ProfileTdContent">{userData.name.firstName}</td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">Middle Name :</td>
                <td className="ProfileTdContent">{userData.name.middleName}</td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">Last Name :</td>
                <td className="ProfileTdContent">{userData.name.lastName}</td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">PRN :</td>
                <td className="ProfileTdContent">{userData.PRN}</td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">Email :</td>
                <td className="ProfileTdContent">{userData.email}</td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">Phone :</td>
                <td className="ProfileTdContent">{userData.contact}</td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">Resources uploaded :</td>
                <td className="ProfileTdContent">
                  {userData.numberOfResourceUploaded}
                </td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">Department :</td>
                <td className="ProfileTdContent">{userData.department}</td>
              </tr>
              <br />
              <br />
            </table>

            <br />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
