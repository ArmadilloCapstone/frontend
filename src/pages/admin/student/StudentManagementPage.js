import React, { useState } from 'react';
import StudentDetail from './StudentDetail';
import StudentAdd from './StudentAdd';
import { Route, Routes } from "react-router-dom";

export default function StudentManagementPage() {
  const [activeIndex, setActiveIndex] = useState(0);



  const tabClickHandler = (index) => {
    setActiveIndex(index);
  };

  const tabContArr = [
    {
      tabTitle: (
        <li className={(activeIndex === 0 ? "is-active" : "")} onClick={() => tabClickHandler(0)}>
          <p class="nav-link active" style={{ backgroundColor: activeIndex === 0 ? "#12B560" : "white",
            color: activeIndex === 0 ? "white" : "gray"}}>돌봄학생 목록</p>
        </li>
      ),
      tabCont: (
        <div className="StudentManagementPage">

          <Routes>
            <Route exact path="/" element={<StudentDetail />} />
          </Routes>
        </div>
      )
    },
    {
      tabTitle: (
        <li className={activeIndex === 1 ? "is-active" : ""} onClick={() => tabClickHandler(1)}>
          <p class="nav-link active" style={{ backgroundColor: activeIndex === 1 ? "#12B560" : "white",
            color: activeIndex === 1 ? "white" : "gray"}}>돌봄학생 추가</p>
        </li>
      ),
      tabCont: (
        <div className="StudentManagementPage">

          <Routes>
            <Route exact path="/" element={<StudentAdd />} />
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


// import StudentDetail from './StudentDetail';

// function StudentManagementPage() {
//   return (
//     <StudentDetail />
//   );
// }
 
// export default StudentManagementPage;