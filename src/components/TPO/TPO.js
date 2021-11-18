import React, { useState, useEffect } from "react";
import TPOSlideBar from "./TPOSlideBar";
import { Redirect } from "react-router";
import axios from "axios";
import Sidebar from "./TPOSlideBar";

function TPO() {
  const [role, setRole] = useState("");

  useEffect(() => {
    axios
      .get("https://afternoon-ocean-57702.herokuapp.com/login", {
        withCredentials: true
      })
      .then((res) => {
        console.log("IN TPO ", res);
        if (res.data.loggedIn === false) setRole("invalid");
        //to get resources
        else {
          setRole(res.data.decodedData.role);
          console.log("In else", res.data.decodedData.role);
        }
      })
      .catch((err) => {
        console.log("error");
        console.log(err.message);
        setRole("invalid");
      });
  }, [role]);

  return (
    <div>
      {role === "" || role === "TPO" ? <Sidebar /> : <Redirect to="/" />}
    </div>
  );
}

export default TPO;
