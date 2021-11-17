import React, { useState } from "react";
import Sidebar from "./TPOSlideBar";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import TPOSidebar from "./TPOSlideBar";
import StudentSidebar from "../Sidebar";

// import axios from "axios";
// import AddNewFolder from "./AddNewFolder";

function InsideSubject(props) {
  const [click, setClick] = useState(false);
  // const { branch, room } = useParams();

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
  console.log(fromWhere);

  return (
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
  );
}

export default Subjects;
