import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import AddNewFolder from "./AddNewFolder";

function InsideFolder(props) {
  const [click, setClick] = useState(false);
  const { room } = useParams();

  function goto() {
    let routeUrl = "/StudentPage/Resources/" + room + "/" + props.branhName;
    console.log(routeUrl);
    return <Redirect to={routeUrl} />;
  }

  return (
    <div
      style={{
        height: "140px",
        width: "100px",
        textAlign: "center",
        display: "inline-block",
        marginRight: "5%"
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
        {props.branhName}
      </label>
    </div>
  );
}

function SubFolder() {
  const [arr, setArr] = useState([]);
  const [role, setRole] = useState("");
  const { room } = useParams();

  useEffect(() => {
    axios
      .get("https://afternoon-ocean-57702.herokuapp.com/login", {
        withCredentials: true
      })
      .then((res) => {
        console.log(res);
        if (res.data.loggedIn === false) setRole("invalid");
        //to get resouces
        else {
          setRole(res.data.decodedData.role);
          axios
            .get("https://afternoon-ocean-57702.herokuapp.com/rooms/" + room)
            .then((data) => {
              console.log(data.data);
              const Branches = data.data;
              for (let i = 0; i < Branches.length; i++) {
                setArr((arr) =>
                  arr.concat(
                    <InsideFolder branhName={Branches[i].branchName} />
                  )
                );
              }
            })
            .catch((err) => {
              console.log(err);
            });
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
      {role === "invalid" ? (
        <Redirect to="/" />
      ) : (
        <div>
          <Sidebar />
          <div
            className="content"
            style={{
              color: "white",
              height: "580px",
              // backgroundColor: "#4b84bd"
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundImage:
                "url(https://media.istockphoto.com/photos/dark-blue-de-focused-blurred-motion-abstract-background-picture-id1216628493?b=1&k=20&m=1216628493&s=170667a&w=0&h=XgGPQTxjdXuWOVHtTPo-zZziQG-qffO5_K4dppHpccI=)"
            }}
          >
            <p>This is Branch page</p>
            {arr}
            {role === "faculty" ? (
              <AddNewFolder Name="Add" route={room + "/"} />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default SubFolder;
