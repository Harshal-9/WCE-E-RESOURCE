import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function ResoFolder(props) {
  const [click, setClick] = useState(false);

  function goto() {
    let routeUrl = "/StudentPage/Resources/" + props.roomName;
    let room = props.roomName;
    console.log(routeUrl);
    if (
      room === "Sem 1" ||
      room === "Sem 2" ||
      room === "Sem 3" ||
      room === "Sem 4" ||
      room === "Sem 5" ||
      room === "Sem 6" ||
      room === "Sem 7" ||
      room === "Sem 8" ||
      room === "Gate"
    ) {
      return <Redirect to={routeUrl} />;
    } else {
      routeUrl = "/StudentPage/Resources/other/" + props.roomName;
      return <Redirect to={routeUrl} />;
    }
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
        {props.roomName}
      </label>
    </div>
  );
}

export default ResoFolder;
