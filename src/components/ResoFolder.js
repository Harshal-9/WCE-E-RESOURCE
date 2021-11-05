import React from "react";

function ResoFolder() {
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
        src={require("./folder2.jpg")}
        alt="img"
        width="100"
        height="100"
        onClick={() => {
          console.log("Folder opened");
        }}
      />
      <label
        style={{
          // for adding ellipsis
          // textOverflow: "ellipsis",
          // display: "inline-block",
          // overflow: "hidden",
          // whiteSpace: "nowrap",
          maxWidth: "100px",
          maxHeight: "100px",
          height: "20px"
        }}
      >
        Coding Coding
      </label>
    </div>
  );
}

export default ResoFolder;