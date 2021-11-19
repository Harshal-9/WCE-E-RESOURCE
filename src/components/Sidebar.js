import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import "../SidebarStyles.css";
function Sidebar() {
  return (
    <div className="sidebarMain">
      {/* <Navbar /> */}
      <div className="sidebar">
        <div style={{ textAlign: "center" }}>
          <img
            src="https://uni.wcoeapps.in/site/static/images/wcoe.jpg"
            alt="wceImg"
            width="75px"
            height="75px"
            style={{ borderRadius: "50%", margin: "2px" }}
          />
        </div>

        <NavLink activeClassName="active" exact to="/StudentPage/profile">
          Profile
        </NavLink>
        <NavLink activeClassName="active" exact to="/StudentPage/Resources">
          Resources
        </NavLink>
        <NavLink
          activeClassName="active"
          exact
          to="/StudentPage/ShowYourResources"
        >
          Your Resources
        </NavLink>
        <NavLink activeClassName="active" exact to="/StudentPage/placement">
          Placement
        </NavLink>
        <NavLink activeClassName="active" exact to="/StudentPage/About">
          About
        </NavLink>
        <NavLink activeClassName="active" exact to="/StudentPage/ContactUS">
          Contact Us
        </NavLink>
        <NavLink activeClassName="active" exact to="/StudentPage/NewLogin">
          New Login
        </NavLink>
        <NavLink activeClassName="active" exact to="/StudentPage/Logout">
          Logout
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
