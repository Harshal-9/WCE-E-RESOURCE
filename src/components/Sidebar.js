import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import "../SidebarStyles.css";
function Sidebar() {
  return (
    <div className="sidebarMain">
      <Navbar />
      <div className="sidebar">
        {/* <NavLink activeClassName="active" exact to="/StudentPage">
          Home
        </NavLink> */}
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
