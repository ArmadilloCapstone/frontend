import React, { useState } from 'react';
import TeacherDetail from './TeacherDetail';
import TeacherAdd from './TeacherAdd';
import { Route, Routes } from "react-router-dom";

export default function TeacherManagementPage() {
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
          돌봄교사 목록
        </button>
      ),
      tabCont: (
        <div className="TeacherManagementPage">
          <Routes>
            <Route exact path="/" element={<TeacherDetail />} />
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
      돌봄교사 추가
    </button>
  ),
  tabCont: (
    <div className="TeacherManagementPage">
      <Routes>
        <Route exact path="/" element={<TeacherAdd />} />
      </Routes>
    </div>
  )
    }
  ];

  return (
    <div className="container" style={{cursor: "pointer" }}>
      <div className="my-3">
        <ul>
          {tabContArr.map((section, index) => {
            return section.tabTitle
          })}
        </ul>

      </div>
      {tabContArr[activeIndex].tabCont}
    </div>
  );
}


// import TeacherDetail from './TeacherDetail';
// import EditTeacher from './EditTeacher';
// import { BrowserRouter as Router, Route,Routes,withRouter} from "react-router-dom";
// function TeacherManagementPage(props) {
//   return (
 
     
//       <div className="TeacherManagementPage">
//         <Routes>
//           <Route exact path="/" element={<TeacherDetail />} />
//           <Route exact path="/EditTeacher/editID/:id" element={<EditTeacher />} />
//         </Routes>
//       </div>
 
//   );
// }
 
// export default TeacherManagementPage;