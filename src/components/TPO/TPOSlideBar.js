import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar";
import "/src/SidebarStyles.css";
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
        <NavLink activeClassName="active" exact to="/TPOPage/Profile">
          Profile
        </NavLink>
        <NavLink activeClassName="active" exact to="/TPOPage/TPOResources/TPO">
          Resources
        </NavLink>
        <NavLink
          activeClassName="active"
          exact
          to="/TPOPage/TPOPlacementInsights"
        >
          Placement Insights
        </NavLink>
        <NavLink
          activeClassName="active"
          exact
          to="/TPOPage/TPOInsightsView/TPO"
        >
          View Insights
        </NavLink>
        <NavLink activeClassName="active" exact to="/TPOPage/Notification">
          Notification
        </NavLink>
        <NavLink activeClassName="active" exact to="/TPOPage/About">
          About
        </NavLink>
        <NavLink activeClassName="active" exact to="/TPOPage/ContactUs">
          Contact Us
        </NavLink>
        <NavLink activeClassName="active" exact to="/TPOPage/Logout">
          Logout
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
