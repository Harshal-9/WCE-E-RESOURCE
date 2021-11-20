import React from "react";
import Sidebar from "./TPOSlideBar";
import { Link } from "react-router-dom";
import axios from "axios";

function Logout() {
  return (
    <div>
      <Sidebar />
      <div
        className="content"
        style={{
          verticalAlign: "center",
          color: "white",
          height: "700px",
          // backgroundColor: "#4b84bd"
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundImage:
            "url(https://media.istockphoto.com/photos/dark-blue-de-focused-blurred-motion-abstract-background-picture-id1216628493?b=1&k=20&m=1216628493&s=170667a&w=0&h=XgGPQTxjdXuWOVHtTPo-zZziQG-qffO5_K4dppHpccI=)"
        }}
      >
        <div
          className="logout"
          style={{
            color: "black",
            backgroundColor: "#ADD8E6",
            marginTop: "150px"
          }}
        >
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
                    console.log("After clicking logout", res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Logout
            </button>
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
