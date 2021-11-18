import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

function Logout() {
  return (
    <div>
      <Sidebar />
      <div className="content" style={{ verticalAlign: "center" }}>
        <div className="logout">
          <h1>Are you sure you want to logout ? </h1>
          <Link to="/">
            <button
              className="logoutButton"
              onClick={() => {
                axios
                  .get("https://afternoon-ocean-57702.herokuapp.com/logout", {
                    withCredentials: true
                  })
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Logout
            </button>
          </Link>
          <Link to="/StudentPage">
            <button className="cancel">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Logout;
