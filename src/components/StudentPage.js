import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Redirect } from "react-router";
import axios from "axios";

function StudentPage() {
  const [role, setRole] = useState("");

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
      {role === "invalid" ? (
        <Redirect to="/" />
      ) : (
        <div>
          <Sidebar />
          <div className="content">
            <p>This is Home page</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentPage;
