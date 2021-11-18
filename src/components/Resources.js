import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ResoFolder from "./ResoFolder";
// import Rooms from "./Rooms";
import axios from "axios";
import AddNewFolder from "./AddNewFolder";
import { Redirect } from "react-router-dom";

function Resources() {
  const [arr, setArr] = useState([]);
  const [role, setRole] = useState("");

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
          axios
            .get("https://afternoon-ocean-57702.herokuapp.com/rooms")
            .then((data) => {
              console.log(data);
              const Rooms = data.data;
              for (let i = 0; i < Rooms.length; i++) {
                setArr((arr) =>
                  arr.concat(<ResoFolder roomName={Rooms[i].roomName} />)
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
          <div className="content">
            <p>This is Resources page</p>
            {arr}
            {role === "faculty" ? <AddNewFolder Name="Add" route="" /> : null}
          </div>
        </div>
      )}
    </div>
  );
}
export default Resources;
