import React from "react";
import axios from "axios";

function AddNewFolder(props) {
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
        src="https://lh3.googleusercontent.com/d/1346ol6YQ3MUwU6UjYqAN-K_mNCLL1FRR=s220?authuser=0"
        alt="img"
        width="100"
        height="100"
        onClick={() => {
          console.log("Add new Folder clicked");
          const roomName = prompt("Enter the name for new room : ");
          console.log(roomName);
          console.log(props);

          if (roomName !== "" && roomName !== null) {
            axios
              .post(
                "https://afternoon-ocean-57702.herokuapp.com/rooms/" +
                  props.route +
                  roomName
              )
              .then((res) => {
                console.log("result", res);
                // console.log(res.data);
                alert("Room : " + roomName + " created successfully !");
                window.location.reload();
              })
              .catch((err) => {
                console.log("error", err);
              });
          } else alert("Room creation cancelled !");
        }}
      />
      <label
        style={{
          textOverflow: "ellipsis",
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          maxWidth: "100px",
          maxHeight: "100px",
          height: "20px"
        }}
      >
        {props.Name}
      </label>
    </div>
  );
}

export default AddNewFolder;
