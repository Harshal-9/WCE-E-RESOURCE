import React, { useState, useEffect } from "react";
import Sidebar from "./TPOSlideBar";
import TPOSidebar from "./TPOSlideBar";
import StudentSidebar from "../Sidebar";
import ResoFolder from "./TPOResoFolder";
// import Rooms from "./Rooms";
import axios from "axios";

function Resources() {
  const { fromWhere } = useParams();
  console.log(fromWhere);
  return (
    <div>
      {fromWhere === "student" ? <StudentSidebar /> : <TPOSidebar />}
      <Sidebar />
      <div className="content">
        <p>This is Resources page</p>
        {/* {arr} */}
      </div>
    </div>
  );
}

export default Resources;
