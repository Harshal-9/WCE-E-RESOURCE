import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Redirect } from "react-router-dom";

function DisplayReso(props) {
  if (props.data.driveLink) {
    return (
      <div>
        <img
          // src={require("./folder2.jpg")}
          src="https://lh3.googleusercontent.com/d/1jkOCUuvYogTvKOLB9Bo8cQ1-MQ8G3tgc=s220?authuser=0"
          alt="img"
          width="100"
          height="100"
          onClick={() => {
            console.log("Folder opened");
          }}
          style={{ display: "inline-block", float: "left" }}
        />
        <br />
        <div /*style={{ display: "inline-block" }}*/>
          <p className="ResoDisplay" style={{ display: "inline-block" }}>
            Name : {props.data.resourceName}
          </p>
          {/* <br /> */}
          <a
            className="ResoDisplay"
            href={props.data.driveLink.webViewLink}
            style={{ color: "black" }}
          >
            view
          </a>
          {/* <br /> */}
          <a
            className="ResoDisplay"
            href={props.data.driveLink.webContentLink}
            style={{ color: "black" }}
          >
            Download
          </a>
          <p className="ResoDisplay" style={{ display: "inline-block" }}>
            Author : {props.data.author.username}
          </p>
          <p className="ResoDisplay" style={{ display: "inline-block" }}>
            {props.data.timestamp}
          </p>
          <hr />
        </div>
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <img
          src="https://lh3.googleusercontent.com/d/1eGHyj9KwZgCdH8grZEpEAE2AK6f4EVX7=s220?authuser=0"
          alt="img"
          width="100"
          height="100"
          onClick={() => {
            console.log("Folder opened");
          }}
          style={{ display: "inline-block", float: "left" }}
        />
        <br />
        <div>
          <p className="ResoDisplay" style={{ display: "inline-block" }}>
            Name : {props.data.resourceName}
          </p>
          {/* <p>{props.data.externalLink.description}</p> */}
          <a
            href={props.data.externalLink.link}
            className="ResoDisplay"
            style={{ display: "inline-block" }}
          >
            Link
          </a>
          <p className="ResoDisplay" style={{ display: "inline-block" }}>
            Author : {props.data.author.username}
          </p>
          <p className="ResoDisplay" style={{ display: "inline-block" }}>
            {props.data.timestamp}
          </p>
          <hr />
        </div>
        <br />
      </div>
    );
  }
}

function MainContent() {
  // Link Submit function

  function handleLinkSubmit(event) {
    event.preventDefault();
    const resoLink = event.target.resoLink.value;
    const desc = event.target.desc.value;
    const linkName = event.target.linkName.value;
    const author = {
      // name: "Nikhil Danapgol",
      // PRN: "2019BTECS00036",
      // email: "a@b.com",
      username: username
    };

    const fd = new FormData();
    fd.append("link", resoLink);
    fd.append("linkName", linkName);
    fd.append("description", desc);

    for (let item in author) {
      fd.append(item, author[item]);
    }

    // route data
    if (room) fd.append("room", room);
    else fd.append("room", "");

    if (branch) fd.append("branch", branch);
    else fd.append("branch", "");

    if (sub) fd.append("subject", sub);
    else fd.append("subject", "");
    axios
      .post("https://afternoon-ocean-57702.herokuapp.com/uploadLink", fd)
      .then((res) => {
        console.log("result", res);
        alert("Link uploaded successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log("error", err);
      });
    console.log(resoLink, desc);
  }

  // File Submit function

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted");

    // file data
    const fileName = event.target.fileName.value;
    const file = event.target.uploadedFile.files[0];
    console.log(fileName);
    console.log(file);

    //personal data
    const author = {
      // name: "Harshal Kodgire",
      // PRN: "2019BTECS00029",
      // email: "a@b.com",
      username: username
    };

    const fd = new FormData();
    fd.append("fileToUpload", file, fileName);

    for (let item in author) {
      // console.log(item, "-", author[item]);
      fd.append(item, author[item]);
    }

    // route data
    if (room) fd.append("room", room);
    else fd.append("room", "");

    if (branch) fd.append("branch", branch);
    else fd.append("branch", "");

    if (sub) fd.append("subject", sub);
    else fd.append("subject", "");

    // console.log(fd);

    axios
      .post("https://afternoon-ocean-57702.herokuapp.com/uploadFile", fd)
      .then((res) => {
        console.log("result", res);
        console.log(res.data);
        alert("File : " + fileName + " uploaded successfully !");
        window.location.reload();
      })
      .catch((err) => {
        console.log("error", err);
      });
    // console.log(fd.getAll);
  }

  const [labelName, setLabelName] = useState("Upload Here");
  const { branch, sub, room } = useParams();
  const [arr, setArr] = useState([]);
  const [role, setRole] = useState("");
  const [username, setUSername] = useState("");

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
          setUSername(res.data.decodedData.username);

          let a = "";
          let b = "";
          let c = "";

          if (room) a = room;
          if (branch) b = branch;
          if (sub) c = sub;

          axios
            .get(
              "https://afternoon-ocean-57702.herokuapp.com/resources/rooms/" +
                a +
                "_" +
                b +
                "_" +
                c
            )
            .then((data) => {
              const RecievedResources = data.data;
              // console.log(data.data);
              for (let i = 0; i < RecievedResources.length; i++) {
                setArr((arr) =>
                  arr.concat(<DisplayReso data={RecievedResources[i]} />)
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
              // backgroundColor: "#4b84bd"
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundImage:
                "url(https://media.istockphoto.com/photos/dark-blue-de-focused-blurred-motion-abstract-background-picture-id1216628493?b=1&k=20&m=1216628493&s=170667a&w=0&h=XgGPQTxjdXuWOVHtTPo-zZziQG-qffO5_K4dppHpccI=)"
            }}
          >
            {/* {arr} */}
            <h1>Upload a file</h1>
            <hr />
            <form type="post" onSubmit={handleSubmit}>
              <div className="UploadResodiv1">
                <h3 style={{ textAlign: "center" }}>Select a file ...</h3>
                <label
                  className="UploadResoLabel"
                  htmlFor="uploadButton"
                  // style={{ backgroundImage: "url(./upload2.png)" }}
                >
                  {labelName}
                </label>
                <input
                  type="file"
                  hidden
                  onChange={(event) => {
                    if (event.target.files[0].name)
                      setLabelName(event.target.files[0].name);
                  }}
                  id="uploadButton"
                  className="UploadResoButton"
                  name="uploadedFile"
                  required
                />
                <br />
              </div>
              <div className="UploadResodiv2">
                <label htmlFor="fileName">Enter Name for file : </label>
                <input type="text" id="fileName" name="fileName" required />
                <br />
                <br />
                {/* <label>Select a room : </label>
            <Select className="selectRoom" /> */}
                <label>Location of upload : </label>
                <input
                  type="text"
                  disabled
                  value={
                    sub
                      ? "StudentPage/Resources/" +
                        room +
                        "/" +
                        branch +
                        "/" +
                        sub
                      : branch
                      ? "StudentPage/Resources/" + room + "/" + branch
                      : "StudentPage/Resources/" + room
                  }
                />
                <br />
                <br />
                <button type="submit">Upload</button>
              </div>
            </form>
            <h1>Upload a link</h1>
            <hr />
            <br />
            <form type="post" onSubmit={handleLinkSubmit}>
              <div style={{ textAlign: "center" }}>
                <label>Enter link for resource : </label>
                <input
                  placeholder="e.g - https://xyz.com"
                  type="url"
                  name="resoLink"
                  required
                />
                <br />
                <br />
                <label>Enter Name : </label>
                <input
                  placeholder="Short Name about link"
                  type="text"
                  name="linkName"
                  required
                />
                <br />
                <br />
                <label>Enter description : </label>
                <input placeholder="optional" type="text" name="desc" />
                <br />
                <br />
                <button style={{ display: "inline-block" }} type="submit">
                  Upload
                </button>
              </div>
            </form>
            <br />
            <h1>Resources</h1>
            <hr />
            {/* <div style={{ backgroundColor: "#045692" }}>{arr}</div> */}

            <div>{arr}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent;
