import React, { useState } from "react";
import StudentLogin from "./StudentLogin";
import StudentPage from "./StudentPage";
import Resources from "./Resources";
import ShowYourResources from "./ShowYourResources";
import ContactUs from "./ContactUs";
import Logout from "./Logout";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import About from "./About";
import SubFolder from "./SubFolder";
import MainContent from "./MainContent";
import Profile from "./Profile";
import Subjects from "./Subjects";
import TPO from "./TPO/TPO";
import TPOAbout from "./TPO/TPOAbout";
import TPOContactUs from "./TPO/TPOContactUs";
import TPOLogout from "./TPO/TPOLogout";
import TPOProfile from "./TPO/TPOProfile";
// import TPOResources from "./TPO/TPOResources";
import TPOBranch from "./TPO/TPOBranch";
import TPOPlacementInsights from "./TPO/TPOPlacementInsights";
import TPONotification from "./TPO/TPONotification";
import TPOStudentDisplay from "./TPO/TPOStudentDisplay";
import NewLoginDetails from "./NewLoginDetails";
import StudentPlacementPage from "./StudentPlacementPage";

function App() {
  const [isStudentLogin, setStudentLogin] = useState(false);
  const [isFacultyLogin, setFacultyLogin] = useState(false);
  const [isTPOLogin, setTPOLogin] = useState(false);

  return (
    // <div className="Home">
    <div>
      {/* <Navbar /> */}
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="Home">
              <div className="div1">
                <img
                  className="wceimg"
                  src="https://uni.wcoeapps.in/site/static/images/wcoe.jpg"
                  alt="wce"
                />
                <h1 style={{ color: "white" }} className="heading">
                  WCE E-RESOURCE
                </h1>
              </div>
              <hr />
              <div className="mainButtons">
                <button
                  className="studentButton"
                  onClick={() => {
                    setStudentLogin(true);
                  }}
                >
                  Student Login
                </button>
                <button
                  className="facultyButton"
                  onClick={() => {
                    setFacultyLogin(true);
                  }}
                >
                  Faculty Login
                </button>
                <button
                  className="TPOButton"
                  onClick={() => {
                    setTPOLogin(true);
                  }}
                >
                  TPO Login
                </button>
                <footer>© Walchand College of Engineering, Sangli</footer>
              </div>
              {isStudentLogin ? <Redirect to="/Login" /> : null}
              {isFacultyLogin ? <Redirect to="/Login" /> : null}
              {isTPOLogin ? <Redirect to="/Login" /> : null}
            </div>
          </Route>
          <Route exact path="/Login">
            <StudentLogin />
          </Route>
          <Route exact path="/StudentPage">
            <StudentPage />
          </Route>
          <Route exact path="/StudentPage/Profile">
            <Profile />
          </Route>
          <Route exact path="/StudentPage/Resources">
            <Resources />
          </Route>
          <Route exact path="/StudentPage/About">
            <About />
          </Route>
          <Route exact path="/StudentPage/ContactUs">
            <ContactUs />
          </Route>
          <Route exact path="/StudentPage/NewLogin">
            <NewLoginDetails />
          </Route>
          <Route exact path="/StudentPage/Logout">
            <Logout />
          </Route>
          <Route exact path="/StudentPage/placement">
            <StudentPlacementPage />
          </Route>
          <Route exact path="/StudentPage/ShowYourResources">
            <ShowYourResources />
          </Route>
          <Route exact path="/StudentPage/Resources/:room">
            <SubFolder />
          </Route>
          <Route exact path="/StudentPage/Resources/other/:room">
            <MainContent />
          </Route>
          <Route exact path="/StudentPage/Resources/:room/:branch">
            <Subjects />
          </Route>
          <Route exact path="/StudentPage/Resources/:room/:branch/:sub">
            <MainContent />
          </Route>
          <Route exact path="/TPOPage">
            <TPO />
          </Route>
          <Route exact path="/TPOPage/About">
            <TPOAbout />
          </Route>
          <Route exact path="/TPOPage/ContactUs">
            <TPOContactUs />
          </Route>
          <Route exact path="/TPOPage/Logout">
            <TPOLogout />
          </Route>
          <Route exact path="/TPOPage/Profile">
            <TPOProfile />
          </Route>
          {/* <Route exact path="/StudentPage/Placement/TPOResources">
            <TPOResources />
          </Route> */}
          <Route exact path="/TPOPage/TPOInsightsView/:fromWhere">
            <TPOStudentDisplay />
          </Route>
          <Route exact path="/TPOPage/Notification">
            <TPONotification />
          </Route>
          <Route exact path="/TPOPage/TPOPlacementInsights">
            <TPOPlacementInsights />
          </Route>
          <Route exact path="/TPOPage/TPOResources/:fromWhere">
            <TPOBranch />
          </Route>
          <Route exact path="/TPOPage/:sub">
            <TPOBranch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
