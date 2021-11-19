import React from "react";
import Sidebar from "./Sidebar";
import "./contactUs.css";

function ContactUs() {
  return (
    <div>
      <Sidebar />
      <div
        className="content"
        style={{
          color: "white",
          height: "600px",
          // backgroundColor: "#4b84bd"
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundImage:
            "url(https://media.istockphoto.com/photos/dark-blue-de-focused-blurred-motion-abstract-background-picture-id1216628493?b=1&k=20&m=1216628493&s=170667a&w=0&h=XgGPQTxjdXuWOVHtTPo-zZziQG-qffO5_K4dppHpccI=)"
        }}
      >
        <h1 style={{ textAlign: "center", marginTop: "30px" }}>CONTACT US</h1>
        <br />
        <br />
        <div
          className="first"
          style={{
            color: "white",

            // backgroundColor: "#4b84bd"
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundImage:
              "url(https://media.istockphoto.com/photos/dark-blue-de-focused-blurred-motion-abstract-background-picture-id1216628493?b=1&k=20&m=1216628493&s=170667a&w=0&h=XgGPQTxjdXuWOVHtTPo-zZziQG-qffO5_K4dppHpccI=)"
          }}
        >
          <h4>
            <h3 style={{ textAlign: "center" }}>Postal Address</h3>
            <br />
            The Director Walchand College of Engineering , A/P: Vishrambag,
            Sangli - 416 415 Maharashtra, India Tel: +91-233-2300383
            Fax:+91-233-2300831
            <br />
            <a style={{ color: "white" }} href="www.walchandsangli.ac.in">
              www.walchandsangli.ac.in{" "}
            </a>
          </h4>
        </div>
        <div
          class="contactMe"
          style={{
            color: "white",
            // backgroundColor: "#4b84bd"
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundImage:
              "url(https://media.istockphoto.com/photos/dark-blue-de-focused-blurred-motion-abstract-background-picture-id1216628493?b=1&k=20&m=1216628493&s=170667a&w=0&h=XgGPQTxjdXuWOVHtTPo-zZziQG-qffO5_K4dppHpccI=)"
          }}
        >
          <h2>Contact me :</h2>
          <form
            action="mailto:nick22052000@gmail.com"
            method="POST"
            enctype="text/plain"
          >
            <table style={{ width: "100%" }}>
              <tr>
                <td>
                  <label>Enter your PRN : </label>
                </td>
                <td>
                  <input type="text" name="Prn" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Enter your Name : </label>
                </td>
                <td>
                  <input type="text" name="Name" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Enter your email : </label>
                </td>
                <td>
                  <input type="email" name="Email" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Enter your message : </label>
                </td>
                <td>
                  <textarea name="Message" rows="10" cols="30"></textarea>
                </td>
              </tr>
            </table>
            <button class="Button" type="submit" value="Send">
              Send
            </button>
          </form>
        </div>
        <div
          className="second"
          style={{
            color: "white",
            // height: "580px",
            // backgroundColor: "#4b84bd"
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundImage:
              "url(https://media.istockphoto.com/photos/dark-blue-de-focused-blurred-motion-abstract-background-picture-id1216628493?b=1&k=20&m=1216628493&s=170667a&w=0&h=XgGPQTxjdXuWOVHtTPo-zZziQG-qffO5_K4dppHpccI=)"
          }}
        >
          <h3 style={{ textAlign: "center" }}>Contact Details</h3>
          <h4>
            <br />
            TPO :{" "}
            <a style={{ color: "white" }} href="placement@walchandsangli.ac.in">
              placement@walchandsangli.ac.in
            </a>
            <br />
            <br />
            Acadamics :{" "}
            <a style={{ color: "white" }} href="hod.cse@walchandsangli.ac.in">
              hod.cse@walchandsangli.ac.in
            </a>
            <br />
            <br />
            Admins :{" "}
            <a style={{ color: "white" }} href="hod.cse@walchandsangli.ac.in">
              hod.cse@walchandsangli.ac.in
            </a>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
