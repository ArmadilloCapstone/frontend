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
        <li className={(activeIndex === 0 ? "is-active" : "")} onClick={() => tabClickHandler(0)}>
          <p class="nav-link active" style={{ backgroundColor: activeIndex === 0 ? "#12B560" : "white",
            color: activeIndex === 0 ? "white" : "gray"}}>돌봄교사 목록</p>
        </li>
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
        <li className={activeIndex === 1 ? "is-active" : ""} onClick={() => tabClickHandler(1)}>
          <p class="nav-link active" style={{ backgroundColor: activeIndex === 1 ? "#12B560" : "white",
            color: activeIndex === 1 ? "white" : "gray"}}>돌봄교사 추가</p>
        </li>
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