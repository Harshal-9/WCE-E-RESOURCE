import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router";
import TPOSidebar from "./TPOSlideBar.js";
import axios from "axios";

import "./TPOMainContent.css";
import Sidebar from "../Sidebar.js";

function TPODisplayReso(props) {
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
          <p className="TPOResoDisplay" style={{ display: "inline-block" }}>
            Name : {props.data.resourceName}
          </p>
          {/* <br /> */}
          <a
            className="TPOResoDisplay"
            href={props.data.driveLink.webViewLink}
            style={{ color: "white" }}
          >
            view
          </a>
          {/* <br /> */}
          <a
            className="TPOResoDisplay"
            href={props.data.driveLink.webContentLink}
            style={{ color: "white" }}
          >
            Download
          </a>
          <p className="TPOResoDisplay" style={{ display: "inline-block" }}>
            Author : {props.data.author.username}
          </p>
          <p className="TPOResoDisplay" style={{ display: "inline-block" }}>
            {props.data.timestamp}
          </p>
        </div>
        <br />
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
          <p className="TPOResoDisplay" style={{ display: "inline-block" }}>
            Name : {props.data.resourceName}
          </p>
          {/* <p>{props.data.externalLink.description}</p> */}
          <a
            href={props.data.externalLink.link}
            className="TPOResoDisplay"
            style={{ display: "inline-block" }}
          >
            Link
          </a>
          <p className="TPOResoDisplay" style={{ display: "inline-block" }}>
            Author : {props.data.author.username}
          </p>
          <p className="TPOResoDisplay" style={{ display: "inline-block" }}>
            {props.data.timestamp}
          </p>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

function TPOMainContent() {
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

    if (TPOBranchRoom) fd.append("branch", TPOBranchRoom);
    else fd.append("branch", "");

    axios
      .post(
        "https://afternoon-ocean-57702.herokuapp.com/placementResources/uploadLink",
        fd
      )
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

    if (TPOBranchRoom) fd.append("branch", TPOBranchRoom);
    else fd.append("branch", "");

    // console.log(fd);

    axios
      .post(
        "https://afternoon-ocean-57702.herokuapp.com/placementResources/uploadFile",
        fd
      )
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
  //-----------------------------------------------------------------------------------------------------------------
  const [labelName, setLabelName] = useState("Upload Here");
  const { TPOBranchRoom } = useParams();
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

          axios
            .get(
              "https://afternoon-ocean-57702.herokuapp.com/placementResources/branches/" +
                TPOBranchRoom
            )
            .then((data) => {
              const RecievedResources = data.data;
              // console.log(data.data);
              for (let i = 0; i < RecievedResources.length; i++) {
                setArr((arr) =>
                  arr.concat(<TPODisplayReso data={RecievedResources[i]} />)
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
        <Redirect to="/login" />
      ) : (
        <div>
          {role === "TPO" ? <TPOSidebar /> : <Sidebar />}
          <div className="content">
            {role === "TPO" ? (
              <div>
                <h1>Upload a file</h1>
                <hr />
                <form type="post" onSubmit={handleSubmit}>
                  <div className="TPOUploadResodiv1">
                    <h3 style={{ textAlign: "center" }}>Select a file ...</h3>
                    <label
                      className="TPOUploadResoLabel"
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
                      className="TPOUploadResoButton"
                      name="uploadedFile"
                      required
                    />
                    <br />
                  </div>
                  <div className="TPOUploadResodiv2">
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
                      value={"TPOPage/TPOResources/branch/" + TPOBranchRoom}
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
              </div>
            ) : null}
            <br />
            <h1>Resources</h1>
            <hr />
            {arr}
          </div>
        </div>
      )}
    </div>
  );
}

export default TPOMainContent;
