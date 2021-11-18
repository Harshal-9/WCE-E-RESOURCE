import React from "react";
import Sidebar from "./TPOSlideBar";
import { Link } from "react-router-dom";

function Logout() {
  return (
    <div>
      <Sidebar />
      <div className="content" style={{ verticalAlign: "center" }}>
        <div className="logout">
          <h1>Are you sure you want to logout ? </h1>
          <Link to="/">
            <button className="logoutButton">Logout</button>
          </Link>
          <Link to="/TPOPage">
            <button className="cancel">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Logout;
