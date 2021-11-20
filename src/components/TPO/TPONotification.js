import React, { useState, useEffect } from "react";
import Sidebar from "./TPOSlideBar";
import axios from "axios";
import { Redirect } from "react-router";

function Notification() {
  function sendNotification(event) {
    event.preventDefault();
    console.log("Submit", event.target.message.value, Date.now());

    const fd = new FormData();
    fd.append("message", event.target.message.value);
    fd.append("time", Date.now());

    axios
      .post("https://afternoon-ocean-57702.herokuapp.com/notification", fd)
      .then((res) => {
        console.log(res);
        alert("Notification added successfully !");
        window.location.reload();
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  function handleDelete(mongoId) {
    console.log(mongoId);

    axios
      .post(
        "https://afternoon-ocean-57702.herokuapp.com/notification/delete/" +
          mongoId
      )
      .then((res) => {
        console.log(res);
        alert("Notification deleted successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [role, setRole] = useState("");
  const [notificationArray, setNotificationArray] = useState([]);

  useEffect(() => {
    axios
      .get("https://afternoon-ocean-57702.herokuapp.com/login", {
        withCredentials: true
      })
      .then((res) => {
        console.log(res);
        if (res.data.loggedIn === false) setRole("invalid");
        else {
          setRole(res.data.decodedData.role);
          axios
            .get("https://afternoon-ocean-57702.herokuapp.com/notification")
            .then((res) => {
              console.log(res);
              let receivedData = res.data;
              for (let i = 0; i < receivedData.length; i++) {
                setNotificationArray((arr) =>
                  arr.concat(
                    <div>
                      <div style={{ textAlign: "left", color: "white" }}>
                        <p style={{ display: "inline-block" }}>
                          <b>{receivedData[i].message} </b>
                          <small
                            style={{ fontSize: "0.9rem", color: "silver" }}
                          >
                            {timeSince(receivedData[i].time)}
                          </small>
                        </p>
                        <button
                          onClick={() => {
                            handleDelete(receivedData[i]._id);
                          }}
                          style={{
                            textAlign: "right",
                            height: "20px",
                            padding: "2px"
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
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
      {role === "" || role === "TPO" ? (
        <div>
          <Sidebar />
          <div
            className="content TPONotificationRespo"
            style={{
              textAlign: "center",
              color: "white",
              // backgroundColor: "#4b84bd"
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundImage:
                "url(https://media.istockphoto.com/photos/dark-blue-de-focused-blurred-motion-abstract-background-picture-id1216628493?b=1&k=20&m=1216628493&s=170667a&w=0&h=XgGPQTxjdXuWOVHtTPo-zZziQG-qffO5_K4dppHpccI=)"
            }}
          >
            <h1 style={{ textAlign: "center" }}>
              Welcome to Notification page
            </h1>
            <br />
            <form onSubmit={sendNotification}>
              <label style={{ textAlign: "center" }}>
                Add new notification
              </label>
              <br />
              <br />
              <textarea
                name="message"
                required
                row="30"
                cols="30"
                style={{
                  resize: "none",
                  height: "100px",
                  backgroundColor: "#85bef7",
                  // backgroundColor: "#327ac2",
                  color: "black"
                }}
              ></textarea>
              <br />
              <br />
              <button>Add new Notification</button>
            </form>
            <br />
            <hr />
            <h1>Previous notification</h1>
            <div style={{ marginBottom: "50px" }}>{notificationArray}</div>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default Notification;

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}
