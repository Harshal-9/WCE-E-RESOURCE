import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router";
import "./StudentPlacementPage.css";

function StudentPlacementPage() {
  function handleViewInsights() {
    setClick2(true);
  }

  function handlePlacementResource() {
    setClick1(true);
  }

  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);
  const [role, setRole] = useState("");
  const [notificationArray, setNotificationArray] = useState([]);

  const { fromWhere } = useParams();

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
              receivedData.reverse();
              for (let i = 0; i < receivedData.length; i++) {
                setNotificationArray((arr) =>
                  arr.concat(
                    <div>
                      <p
                        style={{ display: "inline-block", marginBottom: "2px" }}
                      >
                        <b>{receivedData[i].message} </b>
                        <small style={{ fontSize: "0.9rem", color: "silver" }}>
                          {timeSince(receivedData[i].time)}
                        </small>
                      </p>
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
      {role === "invalid" ? (
        <Redirect to="/" />
      ) : (
        <div>
          <Sidebar />
          <div
            className="content"
            style={{
              textAlign: "center",
              color: "white",
              // height: "100%",
              // backgroundColor: "#4b84bd"
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              backgroundImage:
                "url(https://media.istockphoto.com/photos/dark-blue-de-focused-blurred-motion-abstract-background-picture-id1216628493?b=1&k=20&m=1216628493&s=170667a&w=0&h=XgGPQTxjdXuWOVHtTPo-zZziQG-qffO5_K4dppHpccI=)"
            }}
          >
            <div
              style={{
                textAlign: "center",
                color: "white",
                fontSize: "20px",
                marginBottom: "250px"
              }}
            >
              {notificationArray}
              <br />
              <hr />
              <br />

              <div
                style={{ display: "inline-block" }}
                onClick={handlePlacementResource}
              >
                <img
                  src="https://lh3.googleusercontent.com/d/1jkOCUuvYogTvKOLB9Bo8cQ1-MQ8G3tgc=s220?authuser=0"
                  alt="img"
                  width="300px"
                  height="300px"
                  className="PlacementResourceDiv"
                  onClick={() => {
                    console.log("Folder opened");
                  }}
                  id="placementResource"
                />
                <label
                  htmlFor="placementResource"
                  className="StudentPlacementPageResourceLabel PlacementResourceDiv"
                >
                  View Placement Resources
                </label>
              </div>

              <div
                style={{ display: "inline-block" }}
                onClick={handleViewInsights}
              >
                <img
                  src="https://lh3.googleusercontent.com/d/1av-HJ4V5S_twpUXN7Z6JAlHpZ_645Rif=s220?authuser=0"
                  alt="img"
                  width="300px"
                  height="220px"
                  className="ViewInsightsDiv"
                  onClick={() => {
                    console.log("Folder opened");
                  }}
                  style={{ marginBottom: "40px", marginTop: "40px" }}
                />
                <label
                  htmlFor="placementResource"
                  className="StudentPlacementPageResourceLabel ViewInsightsDiv"
                >
                  View Placement Insights
                </label>
              </div>
              {click1 ? <Redirect to="/TPOPage/TPOResources/student" /> : null}
              {click2 ? (
                <Redirect to="/TPOPage/TPOInsightsView/student" />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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

export default StudentPlacementPage;
