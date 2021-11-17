import React from "react";
import Sidebar from "./TPOSlideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "./TPOProfile.css";
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
  // useEffect(() => {
  //   axios
  //     .get("https://afternoon-ocean-57702.herokuapp.com/login", {
  //       withCredentials: true
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.loggedIn === false) setRole("invalid");
  //       else {
  //         setRole(res.data.decodedData.role);

  //         axios
  //           .get(
  //             "https://afternoon-ocean-57702.herokuapp.com/profile/" +
  //               res.data.decodedData.username
  //           )
  //           .then((data) => {
  //             console.log("Recived data :", data);
  //             setUserData(data.data);
  //           })
  //           .catch((err) => {
  //             console.log("error");
  //             console.log(err.message);
  //           });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("error");
  //       console.log(err.message);
  //       setRole("invalid");
  //     });
  // }, []);

  return (
    <div>
      {role === "invalid" ? (
        <Redirect to="/login" />
      ) : (
        <div>
          <Sidebar />
          <div className="content">
            <div className="profileImg" style={{ marginTop: "12px" }}>
              <img
                style={{ borderRadius: "50%", width: "250px" }}
                src="https://uni.wcoeapps.in/site/static/images/wcoe.jpg"
                alt="wce"
              />
              <hr />
            </div>

            <br />
            <table style={{ width: "100%" }}>
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
