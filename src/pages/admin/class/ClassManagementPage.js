// import ClassDetail from './ClassDetail';
// import { BrowserRouter as Router, Route,Routes,withRouter} from "react-router-dom";
// import {Nav} from 'react-bootstrap';
// import React, { useState } from "react";

// function ClassManagementPage(props) {

//   return (

//       <div className="ClassManagementPage">

//         <Routes>
//           <Route exact path="/" element={<ClassDetail />} />
//         </Routes>
//       </div>

//   );
// }

// export default ClassManagementPage;

import React, { useState } from 'react';
import ClassDetail from './ClassDetail';
import ClassAdd from './ClassAdd';
import { BrowserRouter as Router, Route, Routes, withRouter } from "react-router-dom";

export default function ClassManagementPage() {
  const [activeIndex, setActiveIndex] = useState(0);



  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const tabContArr = [
    {
      tabTitle: (
        <li className={(activeIndex === 0 ? "is-active" : "")} onClick={() => tabClickHandler(0)}>
          <p class="nav-link active" style={{ backgroundColor: activeIndex === 0 ? "#12B560" : "white",
            color: activeIndex === 0 ? "white" : "gray" }}>돌봄학급 목록</p>
        </li>
      ),
      tabCont: (
        <div className="ClassManagementPage">

          <Routes>
            <Route exact path="/" element={<ClassDetail />} />
          </Routes>
        </div>
      )
    },
    {
      tabTitle: (
        <li className={activeIndex === 1 ? "is-active" : ""} onClick={() => tabClickHandler(1)}>
          <p class="nav-link active" style={{ backgroundColor: activeIndex === 1 ? "#12B560" : "white",
            color: activeIndex === 1 ? "white" : "gray"}}>돌봄학급 추가</p>
        </li>
      ),
      tabCont: (
        <div className="ClassManagementPage">

          <Routes>
            <Route exact path="/" element={<ClassAdd />} />
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