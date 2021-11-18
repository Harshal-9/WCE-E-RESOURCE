import React from "react";
import TPOSidebar from "./TPOSlideBar";
import StudentSidebar from "../Sidebar";
import { useEffect, useState } from "react";
import "./TPOStudentDisplay.css";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router";
import Select from "react-select";

function SingleCard(props) {
  // console.log("in single card", props.data);

  const placementDetails = {
    name: props.data.name.firstName + " " + props.data.name.lastName,
    branch: props.data.branch,
    yearOfPassing: props.data.yearOfPassing,
    company: props.data.company,
    interViewExperience: props.data.driveLink.webViewLink,
    linkedinProfile: props.data.linkedinProfile
  };
  return (
    <div class="TPOColumn">
      <div class="card">
        <Flippy
          flipOnHover={true} // default false
          flipOnClick={false} // default false
          flipDirection="horizontal" // horizontal or vertical
          ref={(r) => (this.flippy = r)} // to use toggle method like this.flippy.toggle()
          // if you pass isFlipped prop component will be controlled component.
          // and other props, which will go to div
          style={{ width: "100%", height: "100%" }} /// these are optional style, it is not necessary
        >
          <FrontSide
            style={{
              color: "indigo",
              backgroundImage:
                "url(https://i.pinimg.com/originals/c1/5c/ba/c15cbae66a8a930a1cb292aaf60bb815.jpg)"
            }}
          >
            <h3>{placementDetails.name}</h3>
            <hr />
            <h3>Company : {placementDetails.company}</h3>
            <hr />
            <h3>Branch : {placementDetails.branch}</h3>
          </FrontSide>
          <BackSide
            style={{
              backgroundRepeat: "no-repeat",
              color: "indigo",
              backgroundImage:
                "url(https://www.vectorgraphit.com/wp-content/uploads/2014/04/trianglify-background-5.jpg)"
            }}
          >
            <h3>Year of Passing : {placementDetails.yearOfPassing}</h3>
            <hr />
            <h3>
              <a
                style={{ color: "blue" }}
                href={placementDetails.interViewExperience}
              >
                Interview Experience
              </a>
            </h3>

            <hr />
            <h3>
              <a
                style={{ color: "blue" }}
                href={placementDetails.linkedinProfile}
              >
                Linkedin Profile
              </a>
            </h3>
          </BackSide>
        </Flippy>
      </div>
    </div>
  );
}

function TPOInsightsCode() {
  // function to filter data
  function filterData(event) {
    let tempCompany = [];
    let tempBranch = [];
    let tempYear = [];

    // console.log(selectedCompany, selectedBranch, selectedYear);

    for (let i = 0; i < cardArray.length; i++) {
      if (selectedCompany === "") tempCompany.push(cardArray[i]);

      if (cardArray[i].props.data.company === selectedCompany) {
        tempCompany.push(cardArray[i]);
      }
    }
    for (let i = 0; i < cardArray.length; i++) {
      if (selectedBranch === "") tempBranch.push(cardArray[i]);

      if (cardArray[i].props.data.branch === selectedBranch) {
        tempBranch.push(cardArray[i]);
      }
    }
    for (let i = 0; i < cardArray.length; i++) {
      if (selectedYear === 0) tempYear.push(cardArray[i]);
      if (cardArray[i].props.data.yearOfPassing === selectedYear) {
        tempYear.push(cardArray[i]);
      }
    }

    const intersectionData = [tempCompany, tempBranch, tempYear];
    const result = intersectionData.reduce((a, b) =>
      a.filter((c) => b.includes(c))
    );

    setFilteredCardArray(result);
  }

  const [role, setRole] = useState("");
  const [cardArray, setCardArray] = useState([]);
  const [filteredCardArray, setFilteredCardArray] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [yearArray, setYearArray] = useState([]);

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState(0);

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
            .get("https://afternoon-ocean-57702.herokuapp.com/company")
            .then((res) => {
              console.log(res);
              let tempArray = [{ label: "TCS", value: "TCS" }];
              for (let i = 0; i < res.data.length; i++) {
                tempArray.push({
                  label: res.data[i].company,
                  value: res.data[i].company
                });
              }
              setCompanies(tempArray);
            })
            .catch((err) => {
              console.log("error", err);
            });

          axios
            .get("https://afternoon-ocean-57702.herokuapp.com/placement")
            .then((data) => {
              console.log("Recived data :", data);
              let receivedData = data.data;
              for (let i = 0; i < receivedData.length; i++) {
                console.log(receivedData[i]);
                //setting all card data
                setCardArray((arr) =>
                  arr.concat(<SingleCard data={receivedData[i]} />)
                );
                //setting all card data to filter array
                setFilteredCardArray((arr) =>
                  arr.concat(<SingleCard data={receivedData[i]} />)
                );

                setYearArray((arr) => {
                  if (
                    !arr.find((element) => {
                      return element.label === receivedData[i].yearOfPassing;
                    })
                  ) {
                    return arr.concat({
                      label: receivedData[i].yearOfPassing,
                      value: receivedData[i].yearOfPassing
                    });
                  } else return arr;
                });
              }
              // setUserData(data.data);
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
      {role === "invalid" ? (
        <Redirect to="/" />
      ) : (
        <div>
          <Select
            options={companies}
            placeholder="Select a Company"
            onChange={(event) => {
              console.log(event.value);
              setSelectedCompany(event.value);
            }}
          />
          <br />
          <Select
            options={[
              { label: "CSE", value: "CSE" },
              { label: "IT", value: "IT" },
              { label: "ELECTRONICS", value: "ELECTRONICS" },
              { label: "ELECTRICAL", value: "ELECTRICAL" },
              { label: "MECH", value: "MECH" },
              { label: "CIVIL", value: "CIVIL" }
            ]}
            placeholder="Select a Branch"
            onChange={(event) => {
              console.log(event.value);
              setSelectedBranch(event.value);
            }}
          />
          <br />
          <Select
            options={yearArray}
            placeholder="Select year of passing"
            onChange={(event) => {
              console.log(event.value);
              setSelectedYear(event.value);
            }}
          />
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <button onClick={filterData}>GO</button>
            <button
              onClick={() => {
                window.location.reload();
              }}
            >
              Clear
            </button>
          </div>
          <br />
          <br />
          <div class="TPORow">{filteredCardArray}</div>
        </div>
      )}
    </div>
  );
}

function TPOStudentDisplay() {
  const { fromWhere } = useParams();
  console.log(fromWhere);

  return (
    <div>
      {fromWhere === "student" ? <StudentSidebar /> : <TPOSidebar />}
      <div
        className="content"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundImage:
            // "url(https://www.vectorgraphit.com/wp-content/uploads/2014/04/trianglify-background-21.jpg)"
            // "url(https://media.istockphoto.com/photos/abstract-trianglify-background-picture-id524148056?k=20&m=524148056&s=170667a&w=0&h=Dnz95SqNav9uVsvNYiO8SvN284nEpGN3j2lYZZsd5KY=)"
            "url(https://coolbackgrounds.io/images/backgrounds/index/sea-edge-79ab30e2.png)"
        }}
      >
        <h1 style={{ textAlign: "center", color: "indigo" }}>
          Placement Insights
        </h1>
        <br />
        <br />
        <TPOInsightsCode />
      </div>
    </div>
  );
}

export default TPOStudentDisplay;
