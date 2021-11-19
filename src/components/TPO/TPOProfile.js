import React from "react";
import TPOSidebar from "./TPOSlideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "./TPOProfile.css";
function Profile() {
  const [role, setRole] = useState("");

  const [userData, setUserData] = useState({
    name: {
      firstName: "",
      middleName: "",
      lastName: ""
    },
    username: "",
    PRN: "",
    email: "",
    contact: "",
    department: "",
    numberOfResourceUploaded: 0
  });
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
            .get(
              "https://afternoon-ocean-57702.herokuapp.com/profile/" +
                res.data.decodedData.username
            )
            .then((data) => {
              console.log("Recived data :", data);
              setUserData(data.data);
            })
            .catch((err) => {
              console.log("error");
              console.log(err.message);
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
          <TPOSidebar />
          <div
            className="content"
            style={{
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundImage:
                // "url(https://image.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette_1258-48251.jpg)"
                // "url(https://media.licdn.cn/dms/image/C4E1BAQE4ofhcBRTYdg/company-background_10000/0/1606292608046?e=2159024400&v=beta&t=_sdCQplzO_jQzpH_dSnPOvWv8OIVi7JrGg5oO26692o)"
                // "url(https://image.shutterstock.com/image-vector/dark-blue-vector-shining-triangular-260nw-1468953182.jpg)"
                // "url(https://c4.wallpaperflare.com/wallpaper/249/441/168/simple-blue-wallpaper-preview.jpg)"
                "url(https://t4.ftcdn.net/jpg/03/09/98/05/360_F_309980531_cX4DU03cgU35JKFrpRcbZlSQcaptgfx9.jpg)"
              // "url(https://us.123rf.com/450wm/panychev/panychev1603/panychev160300672/54290362-abstract-dark-blue-background.jpg)"
              // "url(https://png.pngtree.com/thumb_back/fw800/background/20210115/pngtree-dark-blue-geometric-overlay-vector-background-image_528217.jpg)"
              // "url(https://www.teahub.io/photos/full/220-2208960_dark-blue-lines-4k-material-design-creative-geometric.jpg)"
              // "url(https://media.istockphoto.com/photos/dark-blue-de-focused-blurred-motion-abstract-background-picture-id1216628493?b=1&k=20&m=1216628493&s=170667a&w=0&h=XgGPQTxjdXuWOVHtTPo-zZziQG-qffO5_K4dppHpccI=)"
              // "url(https://coolbackgrounds.io/images/backgrounds/index/sea-edge-79ab30e2.png)"
            }}
          >
            <div className="profileImg" style={{ marginTop: "20px" }}>
              <div
                style={{
                  textAlign: "center",
                  display: "inline-block"
                }}
                id="circle"
              >
                <h1
                  style={{ margin: "20%", marginTop: "25%", fontSize: "80px" }}
                >
                  {userData.name.firstName[0]}
                  {userData.name.lastName[0]}
                </h1>
              </div>
              <hr />
            </div>

            <br />
            <table style={{ width: "100%" }}>
              <tr>
                <td className="ProfileTdTitle">Username :</td>
                <td className="ProfileTdContent">{userData.username}</td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">First Name :</td>
                <td className="ProfileTdContent">{userData.name.firstName}</td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">Middle Name :</td>
                <td className="ProfileTdContent">{userData.name.middleName}</td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">Last Name :</td>
                <td className="ProfileTdContent">{userData.name.lastName}</td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">PRN :</td>
                <td className="ProfileTdContent">{userData.PRN}</td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">Email :</td>
                <td className="ProfileTdContent">{userData.email}</td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">Phone :</td>
                <td className="ProfileTdContent">{userData.contact}</td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">Resources uploaded :</td>
                <td className="ProfileTdContent">
                  {userData.numberOfResourceUploaded}
                </td>
              </tr>
              <br />
              <br />

              <tr>
                <td className="ProfileTdTitle">Department :</td>
                <td className="ProfileTdContent">{userData.department}</td>
              </tr>
              <br />
              <br />
            </table>

            <br />
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default Profile;
