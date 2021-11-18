import React, { useState, useEffect } from "react";
import Sidebar from "./TPOSlideBar";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import TPOSidebar from "./TPOSlideBar";
import StudentSidebar from "../Sidebar";
import axios from "axios";

function InsideSubject(props) {
  const [click, setClick] = useState(false);

  function goto() {
    let routeUrl = "/TPOPage/TPOResources/branch/" + props.subName;
    console.log(routeUrl);
    return <Redirect to={routeUrl} />;
  }

  return (
    <div
      style={{
        height: "140px",
        width: "100px",
        textAlign: "center",
        display: "inline-block"
      }}
    >
      <img
        // src={require("./folder2.jpg")}
        src="https://lh3.googleusercontent.com/d/1YJuoWBEdEQC4bwtpk7Qdq92cwRzw-XWD=s220?authuser=0"
        alt="img"
        width="100"
        height="100"
        onClick={() => {
          console.log("Folder opened");
          setClick(true);
        }}
      />
      {click ? goto() : null}
      <label
        style={{
          // for adding ellipsis
          textOverflow: "ellipsis",
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          maxWidth: "100px",
          maxHeight: "100px",
          height: "20px"
        }}
      >
        {props.subName}
      </label>
    </div>
  );
}

function Subjects() {
  const { fromWhere } = useParams();
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
      {role !== "TPO" ? (
        <Redirect to="/StudentPage" />
      ) : (
        <div>
          {fromWhere === "student" ? <StudentSidebar /> : <TPOSidebar />}
          <div className="content">
            <InsideSubject subName="CSE" />
            <InsideSubject subName="IT" />
            <InsideSubject subName="Electronics" />
            <InsideSubject subName="Civil" />
            <InsideSubject subName="Mechanical" />
            <InsideSubject subName="Electrical" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Subjects;
