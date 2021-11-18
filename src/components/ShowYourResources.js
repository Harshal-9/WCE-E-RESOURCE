import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./ShowYourResources.css";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Select from "react-select";

function ShowYourResourcesCode(props) {
  // function for deleting resources
  function handleDelete() {
    const receivedObj = resources[0].idObj;
    const fd = new FormData();

    let tempRoute = "";

    if (receivedObj.driveId) {
      tempRoute = "uploadFile";
      fd.append("mongoId", receivedObj.mongoId);
      fd.append("driveId", receivedObj.driveId);
    } else {
      tempRoute = "uploadLink";
      fd.append("mongoId", receivedObj.mongoId);
    }

    axios
      .post(
        "https://afternoon-ocean-57702.herokuapp.com/" + tempRoute + "/delete",
        fd
      )
      .then((data) => {
        console.log(data);
        alert("Deleted resource successsfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    //to reload currentPage
  }

  const resources = [
    {
      srNO: props.srNO,
      resourceName: props.data.resourceName,
      view: props.data.driveLink ? (
        <a href={props.data.driveLink.webViewLink}>View</a>
      ) : (
        <a href={props.data.externalLink.link}>View</a>
      ),
      delete: "Delete",
      idObj: props.data.driveLink
        ? { driveId: props.data.driveLink.id, mongoId: props.data._id }
        : { mongoId: props.data._id },
      download: props.data.driveLink ? (
        <a href={props.data.driveLink.webContentLink}>Download</a>
      ) : (
        "-"
      ),
      date: props.data.timestamp,
      room: props.data.room,
      author: props.data.author.username
    }
  ];

  return (
    <div style={{ backgroundColor: "wheat" }}>
      <tr>
        <td className="ShowYourResources_srno">{resources[0].srNO}</td>
        <td className="ShowYourResources_td">{resources[0].resourceName}</td>
        <td className="ShowYourResources_view">{resources[0].view}</td>
        <td className="ShowYourResources_download">{resources[0].download}</td>
        <td className="ShowYourResources_td">{resources[0].date}</td>
        <td className="ShowYourResources_td">{resources[0].room}</td>
        <td className="ShowYourResources_td">{resources[0].author}</td>

        <td className="ShowYourResources_td">
          <button onClick={handleDelete}>{resources[0].delete}</button>
        </td>
      </tr>
      <hr />
    </div>
  );
}

// -------------------------------------------------------------------

function ShowYourResources() {
  // function to display data according to selected resource name
  function filterResourceData(event) {
    console.log("Here : ", event.value);
    let temp = [];

    for (let i = 0; i < allresourceElements.length; i++) {
      if (allresourceElements[i].props.data.resourceName === event.value) {
        console.log(allresourceElements[i]);
        temp.push(allresourceElements[i]);
      }
    }
    setArr(temp);
  }

  // function to display data according to selected author name
  function filterAuthorData(event) {
    console.log("Here : ", event.value);
    let temp = [];

    for (let i = 0; i < allresourceElements.length; i++) {
      if (allresourceElements[i].props.data.author.username === event.value) {
        console.log(allresourceElements[i]);
        temp.push(allresourceElements[i]);
      }
    }
    setArr(temp);
  }

  const [arr, setArr] = useState([]);
  const [role, setRole] = useState("");
  const [allresourceElements, setAllResourceElements] = useState([]);
  const [filteredResourceNames, setFilteredResourceNames] = useState([]);
  const [filteredAuthorNames, setFilteredAuthorNames] = useState([]);

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
          if (res.data.decodedData.role === "faculty") {
            axios
              .get("https://afternoon-ocean-57702.herokuapp.com/resources/")
              .then((data) => {
                const RecievedResources = data.data;

                for (let i = 0; i < RecievedResources.length; i++) {
                  //setting for all resources
                  setAllResourceElements((arr) =>
                    arr.concat(
                      <ShowYourResourcesCode
                        data={RecievedResources[i]}
                        srNO={i + 1}
                      />
                    )
                  );

                  //setting for filtered resources
                  setFilteredResourceNames((arr) =>
                    arr.concat({
                      label: RecievedResources[i].resourceName,
                      value: RecievedResources[i].resourceName
                    })
                  );

                  //setting for filtered author name
                  setFilteredAuthorNames((arr) => {
                    console.log("Arr:", arr);
                    if (
                      !arr.find((element) => {
                        return (
                          element.label === RecievedResources[i].author.username
                        );
                      })
                    ) {
                      return arr.concat({
                        label: RecievedResources[i].author.username,
                        value: RecievedResources[i].author.username
                      });
                    } else return arr;
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            axios
              .get(
                "https://afternoon-ocean-57702.herokuapp.com/resources/users/" +
                  res.data.decodedData.username //change to actual username recieved from login route
              )
              .then((data) => {
                const RecievedResources = data.data;

                for (let i = 0; i < RecievedResources.length; i++) {
                  //setting for all resources
                  setAllResourceElements((arr) =>
                    arr.concat(
                      <ShowYourResourcesCode
                        data={RecievedResources[i]}
                        srNO={i + 1}
                      />
                    )
                  );
                  //setting for filtered resources
                  setFilteredResourceNames((arr) =>
                    arr.concat({
                      label: RecievedResources[i].resourceName,
                      value: RecievedResources[i].resourceName
                    })
                  );
                  //setting for filtered author name
                  setFilteredAuthorNames((arr) => {
                    console.log("Arr:", arr);
                    if (
                      !arr.find((element) => {
                        return (
                          element.label === RecievedResources[i].author.username
                        );
                      })
                    ) {
                      return arr.concat({
                        label: RecievedResources[i].author.username,
                        value: RecievedResources[i].author.username
                      });
                    } else return arr;
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
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
          <div className="content ">
            <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
              Resources uploaded by you :-
            </h2>

            <div style={{ textAlign: "center" }}>
              <h2 style={{ display: "inline-block", marginRight: "10px" }}>
                Filter :
              </h2>
              <Select
                options={filteredResourceNames}
                className="searchResource"
                onChange={filterResourceData}
                placeholder="Search by Name"
              />
              <Select
                options={filteredAuthorNames}
                className="searchResource"
                onChange={filterAuthorData}
                placeholder="Search by Author"
              />
              <br />
              <br />
              <br />
              {arr.length > 0 ? (
                <tr>
                  <td className="ShowYourResources_srno">SrNo</td>
                  <td className="ShowYourResources_td">Resource Name</td>
                  <td className="ShowYourResources_view">View</td>
                  <td className="ShowYourResources_download">Download</td>
                  <td className="ShowYourResources_td">Date</td>
                  <td className="ShowYourResources_td">Room</td>
                  <td className="ShowYourResources_td">Author</td>
                  <td className="ShowYourResources_td">Delete</td>
                </tr>
              ) : null}
              <hr />
              {arr}
            </div>
            <div>
              <br />
              <div
                style={{
                  textAlign: "center"
                }}
              >
                <h2>All resources</h2>
              </div>
              <br />
              <tr>
                <td className="ShowYourResources_srno">SrNo</td>
                <td className="ShowYourResources_td">Resource Name</td>
                <td className="ShowYourResources_view">View</td>
                <td className="ShowYourResources_download">Download</td>
                <td className="ShowYourResources_td">Date</td>
                <td className="ShowYourResources_td">Room</td>
                <td className="ShowYourResources_td">Author</td>
                <td className="ShowYourResources_td">Delete</td>
              </tr>
              <hr />
              {allresourceElements}
              <br />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowYourResources;
