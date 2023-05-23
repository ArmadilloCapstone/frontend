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
        <button
          className={`tab-button ${activeIndex === 0 ? "active" : ""}`}
          onClick={() => tabClickHandler(0)}
        >
          돌봄학생 목록
        </button>
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
        <button
        className={`tab-button ${activeIndex === 1 ? "active" : ""}`}
        onClick={() => tabClickHandler(1)}
      >
        돌봄학생 추가
      </button>
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
    <div className="container" style={{ cursor: "pointer" }}>
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