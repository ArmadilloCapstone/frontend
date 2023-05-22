import React, { useState } from 'react';
import StudentScheduleDetail from './StudentScheduleDetail';
import StudentScheduleAdd from './StudentScheduleAdd';
import { Route, Routes } from "react-router-dom";

export default function StudentScheduleManagement() {
  const [activeIndex, setActiveIndex] = useState(0);



  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const tabContArr = [
    {
      tabTitle: (
        <li className={(activeIndex === 0 ? "is-active" : "")} onClick={() => tabClickHandler(0)}>
          <p class="nav-link active" style={{ backgroundColor: activeIndex === 0 ? "#12B560" : "white",
            color: activeIndex === 0 ? "white" : "gray"}}>학생 시간표 목록</p>
        </li>
      ),
      tabCont: (
        <div className="StudentScheduleManagementPage">

          <Routes>
            <Route exact path="/" element={<StudentScheduleDetail />} />
          </Routes>
        </div>
      )
    },
    {
      tabTitle: (
        <li className={activeIndex === 1 ? "is-active" : ""} onClick={() => tabClickHandler(1)}>
          <p class="nav-link active" style={{ backgroundColor: activeIndex === 1 ? "#12B560" : "white",
            color: activeIndex === 1 ? "white" : "gray"}}>학생 시간표 추가</p>
        </li>
      ),
      tabCont: (
        <div className="StudentScheduleManagementPage">

          <Routes>
            <Route exact path="/" element={<StudentScheduleAdd />} />
          </Routes>
        </div>
      )
    }
  ];

  return (
    <div className="container" style={{ width: "1200px", cursor: "pointer" }}>
      <div className="my-3">
        <ul class="nav nav-tabs">
          {tabContArr.map((section, index) => {
            return section.tabTitle
          })}
        </ul>

      </div>
      {tabContArr[activeIndex].tabCont}
    </div>
  );
}


// import StudentScheduleDetail from "./StudentScheduleDetail";
// import { BrowserRouter as Router, Route,Routes,withRouter} from "react-router-dom";
// function StudentScheduleManagementPage(props) {
//   return (
 
     
//       <div className="StudentScheduleManagementPage">
//         <Routes>
//           <Route exact path="/" element={<StudentScheduleDetail />} />
//         </Routes>
//       </div>
 
//   );
// }
 
// export default StudentScheduleManagementPage;